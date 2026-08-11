#!/usr/bin/env python3
"""Resolve wedding song requests to Spotify track links."""

from __future__ import annotations

import json
import re
import time
from pathlib import Path
from urllib.parse import quote

from spotify_scraper import SpotifyClient

ROOT = Path(__file__).resolve().parent.parent
INPUT = ROOT / "song-requests.json"
OUTPUT_JSON = ROOT / "song-requests-spotify.json"
OUTPUT_MD = ROOT / "song-requests-spotify.md"

VAGUE_PATTERNS = [
    r"^anything\b",
    r"^what genre",
    r"^dubstep$",
    r"^creed$",
    r"you know the vibes",
    r"just kidding \(unless\)",
    r"baaa?adadaaa",
]

BAD_MARKERS = [
    "cover",
    "karaoke",
    "tribute",
    "8-bit",
    "made popular",
    "vocal version",
    "in the style of",
]

client = SpotifyClient()


def is_vague(text: str) -> bool:
    lowered = text.lower().strip()
    return any(re.search(p, lowered) for p in VAGUE_PATTERNS)


def clean_query(text: str) -> str:
    q = text.strip()
    q = re.sub(r"^[\"']|[\"']$", "", q)
    q = re.sub(r"^[A-Za-z]+:\s*", "", q)
    q = re.sub(r"\s*[🥰😎<3]+", "", q)
    q = re.sub(r"\s*!+\s*$", "", q)
    q = re.sub(r"\s+", " ", q).strip()
    return q


def normalize(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def token_overlap(a: str, b: str) -> float:
    a_tokens = set(normalize(a).split())
    b_tokens = set(normalize(b).split())
    if not a_tokens or not b_tokens:
        return 0.0
    return len(a_tokens & b_tokens) / len(a_tokens | b_tokens)


def query_variants(text: str) -> list[tuple[str, str | None, str | None]]:
    """Return (search query, expected title, expected artist)."""
    cleaned = clean_query(text)
    variants: list[tuple[str, str | None, str | None]] = [(cleaned, cleaned, None)]

    for sep in [" - ", " -- ", " by "]:
        if sep in cleaned.lower():
            idx = cleaned.lower().index(sep.lower())
            left = cleaned[:idx].strip()
            right = cleaned[idx + len(sep) :].strip()
            if left and right:
                variants.append((f"{left} {right}", left, right))
                variants.append((f"{right} {left}", right, left))
                variants.append((left, left, right))
                variants.append((right, right, left))

    deduped: list[tuple[str, str | None, str | None]] = []
    seen = set()
    for item in variants:
        if item[0] not in seen:
            seen.add(item[0])
            deduped.append(item)
    return deduped


def split_multi_request(text: str) -> list[str]:
    if is_vague(text):
        return [text]

    if "mandatory" in text.lower() or "throwback" in text.lower():
        parts = []
        if "cupid shuffle" in text.lower():
            parts.append("Cupid Shuffle Cupid")
        if "pump it up" in text.lower():
            parts.append("Pump It Up Endor")
        if "chris brown" in text.lower() or "breezy" in text.lower():
            parts.append("Forever Chris Brown")
        return parts or [text]

    return [text]


def spotify_url(track_id: str) -> str:
    return f"https://open.spotify.com/track/{track_id}"


def search_tracks(query: str, limit: int = 8) -> list:
    try:
        results = client.search(query, types=["track"], limit=limit)
    except Exception:
        return []
    return list(results.tracks or [])


def score_track(
    expected_title: str | None,
    expected_artist: str | None,
    track_name: str,
    track_artist: str,
) -> float:
    combined = f"{track_name} {track_artist}".lower()
    if any(marker in combined for marker in BAD_MARKERS):
        return -1.0

    title = expected_title or ""
    artist = expected_artist or ""

    title_score = token_overlap(title, track_name) if title else 0.0
    artist_score = token_overlap(artist, track_artist) if artist else 0.0

    if artist and title:
        return title_score * 0.55 + artist_score * 0.45
    if title:
        return title_score
    return token_overlap(expected_title or "", track_name)


def lookup_display(display: str) -> dict:
    best = None
    best_score = -1.0
    best_query = display

    for query, expected_title, expected_artist in query_variants(display):
        tracks = search_tracks(query)
        time.sleep(0.25)
        for track in tracks:
            track_artist = track.artists[0].name if track.artists else ""
            score = score_track(expected_title, expected_artist, track.name, track_artist)
            if score > best_score:
                best_score = score
                best = track
                best_query = query

    if best and best_score >= 0.28:
        track_artist = best.artists[0].name if best.artists else ""
        return {
            "query": best_query,
            "confidence": round(best_score, 2),
            "spotifyId": best.id,
            "spotifyUrl": spotify_url(best.id),
            "spotifyTitle": best.name,
            "spotifyArtist": track_artist,
            "spotifyAlbum": best.album.name if best.album else None,
            "status": "found",
        }

    cleaned = clean_query(display)
    return {
        "query": cleaned,
        "status": "not_found",
        "searchUrl": f"https://open.spotify.com/search/{quote(cleaned)}",
    }


def main() -> None:
    data = json.loads(INPUT.read_text(encoding="utf-8"))
    resolved = []
    found = 0
    not_found = 0
    vague = 0

    for i, song in enumerate(data["consolidated"], start=1):
        display = song["display"]
        parts = split_multi_request(clean_query(display))

        if is_vague(display):
            vague += 1
            resolved.append(
                {
                    "num": i,
                    "requested": display,
                    "requestedBy": song["requestedBy"],
                    "status": "vague",
                    "entries": [],
                }
            )
            continue

        entries = []
        for part in parts:
            if is_vague(part):
                continue
            result = lookup_display(part)
            entries.append(result)
            if result["status"] == "found":
                found += 1
            else:
                not_found += 1

        status = "found" if entries and all(e["status"] == "found" for e in entries) else (
            "partial" if any(e["status"] == "found" for e in entries) else "not_found"
        )
        resolved.append(
            {
                "num": i,
                "requested": display,
                "requestedBy": song["requestedBy"],
                "isYouTube": song.get("isYouTube", False),
                "status": status,
                "entries": entries,
            }
        )

    summary = {
        "total": len(resolved),
        "found": found,
        "notFound": not_found,
        "vague": vague,
        "songs": resolved,
    }
    OUTPUT_JSON.write_text(json.dumps(summary, indent=2), encoding="utf-8")

    lines = [
        "# Wedding Song Requests — Spotify Links",
        "",
        f"Resolved **{found}** track links across **{len(resolved)}** guest submissions.",
        f"({vague} vague/genre requests skipped; {not_found} with no confident Spotify match)",
        "",
        "---",
        "",
        "## All Requests",
        "",
        "| # | Requested | Spotify | Match | Requested By |",
        "|---|-----------|---------|-------|--------------|",
    ]

    for item in resolved:
        if item["status"] == "vague":
            lines.append(
                f"| {item['num']} | {item['requested']} | — | vague/genre request | {item['requestedBy']} |"
            )
            continue

        if not item["entries"]:
            lines.append(
                f"| {item['num']} | {item['requested']} | — | not found | {item['requestedBy']} |"
            )
            continue

        for j, entry in enumerate(item["entries"]):
            num = item["num"] if j == 0 else ""
            requested = item["requested"] if j == 0 else ""
            requested_by = item["requestedBy"] if j == 0 else ""
            if entry["status"] == "found":
                match = f"{entry['spotifyTitle']} — {entry['spotifyArtist']}"
                spotify = f"[Open]({entry['spotifyUrl']})"
            else:
                match = "no confident match (search link provided)"
                spotify = f"[Search]({entry.get('searchUrl', '')})"
            lines.append(
                f"| {num} | {requested} | {spotify} | {match} | {requested_by} |"
            )

    OUTPUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT_JSON.name} and {OUTPUT_MD.name}")
    print(f"Found: {found}, Not found: {not_found}, Vague: {vague}")


if __name__ == "__main__":
    main()