#!/usr/bin/env python3
from __future__ import annotations

import html
import json
import re
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / "song-requests-spotify.json").read_text(encoding="utf-8"))
OUT = ROOT / "song-requests-spotify.html"


def clean_search(text: str) -> str:
    text = re.sub(r"^[\"']|[\"']$", "", text.strip())
    text = re.sub(r"^[A-Za-z]+:\s*", "", text)
    text = re.sub(r"\s*[🥰😎<3]+", "", text)
    return re.sub(r"\s+", " ", text).strip()


def search_url(text: str) -> str:
    return f"https://open.spotify.com/search/{quote(clean_search(text))}"


rows: list[str] = []
link_num = 0

for item in DATA["songs"]:
    num = item["num"]
    requested = item["requested"]
    requested_by = item["requestedBy"]
    status = item.get("status", "unknown")

    if status == "vague" or not item.get("entries"):
        link_num += 1
        row_id = f"song-{link_num}"
        url = search_url(requested)
        rows.append(
            f"""
      <tr class="search" data-id="{row_id}">
        <td class="check-cell"><input type="checkbox" class="done-check" id="{row_id}" aria-label="Mark as reviewed" /></td>
        <td>{num}</td>
        <td>{html.escape(requested)}</td>
        <td>{html.escape(requested_by)}</td>
        <td><span class="badge search-badge">Search manually</span></td>
        <td>—</td>
        <td><a class="btn search-btn" href="{html.escape(url)}" target="_blank" rel="noopener noreferrer">Search on Spotify</a></td>
      </tr>"""
        )
        continue

    for entry in item["entries"]:
        link_num += 1
        row_id = f"song-{link_num}"
        if entry.get("status") == "found":
            url = entry["spotifyUrl"]
            match = f"{entry['spotifyTitle']} — {entry['spotifyArtist']}"
            badge = '<span class="badge found-badge">Found</span>'
            btn_class = "found-btn"
            btn_text = "Open on Spotify"
            confidence = entry.get("confidence")
            if confidence is not None and confidence < 0.6:
                badge = '<span class="badge verify-badge">Verify match</span>'
        else:
            url = entry.get("searchUrl") or search_url(requested)
            match = "No confident match"
            badge = '<span class="badge search-badge">Search manually</span>'
            btn_class = "search-btn"
            btn_text = "Search on Spotify"

        rows.append(
            f"""
      <tr data-id="{row_id}">
        <td class="check-cell"><input type="checkbox" class="done-check" id="{row_id}" aria-label="Mark as reviewed" /></td>
        <td>{num}</td>
        <td>{html.escape(requested)}</td>
        <td>{html.escape(requested_by)}</td>
        <td>{badge}</td>
        <td>{html.escape(match)}</td>
        <td><a class="btn {btn_class}" href="{html.escape(url)}" target="_blank" rel="noopener noreferrer">{btn_text}</a></td>
      </tr>"""
        )

page = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wedding Song Requests — Spotify</title>
  <style>
    :root {{
      --bg: #121212;
      --panel: #181818;
      --text: #f5f5f5;
      --muted: #b3b3b3;
      --green: #1db954;
      --green-hover: #1ed760;
      --orange: #f59e0b;
      --border: #2a2a2a;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: Inter, Segoe UI, system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
    }}
    .wrap {{
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 20px 64px;
    }}
    h1 {{
      margin: 0 0 8px;
      font-size: 2rem;
      font-weight: 700;
    }}
    .sub {{
      color: var(--muted);
      margin-bottom: 24px;
    }}
    .stats {{
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
    }}
    .stat {{
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 16px;
      min-width: 140px;
    }}
    .stat strong {{
      display: block;
      font-size: 1.4rem;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow: hidden;
    }}
    th, td {{
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
      text-align: left;
    }}
    th {{
      background: #202020;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--muted);
    }}
    tr:last-child td {{ border-bottom: none; }}
    tr:hover td {{ background: #1f1f1f; }}
    tr.reviewed td {{
      opacity: 0.45;
    }}
    tr.reviewed:hover td {{ background: #1a1a1a; }}
    .check-cell {{
      width: 44px;
      text-align: center;
    }}
    .done-check {{
      width: 18px;
      height: 18px;
      accent-color: var(--green);
      cursor: pointer;
    }}
    .toolbar {{
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      margin-bottom: 16px;
    }}
    .toolbar button {{
      background: #2a2a2a;
      color: var(--text);
      border: 1px solid #444;
      border-radius: 999px;
      padding: 8px 14px;
      font-weight: 600;
      cursor: pointer;
    }}
    .toolbar button:hover {{ border-color: #666; }}
    .btn {{
      display: inline-block;
      padding: 8px 14px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      white-space: nowrap;
    }}
    .found-btn {{
      background: var(--green);
      color: #000;
    }}
    .found-btn:hover {{ background: var(--green-hover); }}
    .search-btn {{
      background: transparent;
      color: var(--text);
      border: 1px solid #555;
    }}
    .search-btn:hover {{ border-color: #888; }}
    .badge {{
      display: inline-block;
      padding: 4px 8px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
    }}
    .found-badge {{ background: rgba(29, 185, 84, 0.15); color: var(--green); }}
    .search-badge {{ background: rgba(245, 158, 11, 0.15); color: var(--orange); }}
    .verify-badge {{ background: rgba(245, 158, 11, 0.15); color: var(--orange); }}
    .note {{
      margin-top: 20px;
      color: var(--muted);
      font-size: 0.95rem;
    }}
    @media (max-width: 900px) {{
      table, thead, tbody, th, td, tr {{ display: block; }}
      thead {{ display: none; }}
      tr {{
        margin-bottom: 16px;
        border: 1px solid var(--border);
        border-radius: 12px;
        overflow: hidden;
      }}
      td {{
        border: none;
        border-bottom: 1px solid var(--border);
      }}
      td::before {{
        content: attr(data-label);
        display: block;
        font-size: 0.75rem;
        color: var(--muted);
        text-transform: uppercase;
        margin-bottom: 4px;
      }}
    }}
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Wedding Song Requests</h1>
    <p class="sub">Check off each song as you review it — progress saves automatically in this browser.</p>
    <div class="stats">
      <div class="stat"><strong id="reviewed-count">0</strong> reviewed</div>
      <div class="stat"><strong id="remaining-count">{link_num}</strong> remaining</div>
      <div class="stat"><strong>{DATA['found']}</strong> direct track links</div>
      <div class="stat"><strong>{DATA['notFound'] + DATA['vague']}</strong> search manually</div>
      <div class="stat"><strong>{link_num}</strong> total links</div>
    </div>
    <div class="toolbar">
      <button type="button" id="show-remaining">Show remaining only</button>
      <button type="button" id="show-all">Show all</button>
      <button type="button" id="reset-progress">Reset checkboxes</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Done</th>
          <th>#</th>
          <th>Requested</th>
          <th>Guest</th>
          <th>Status</th>
          <th>Spotify match</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        {''.join(rows)}
      </tbody>
    </table>
    <p class="note">Tip: rows marked "Verify match" found something on Spotify but may not be the exact version requested — worth a quick listen before adding to the playlist.</p>
  </div>
  <script>
    const STORAGE_KEY = "wedding-song-requests-checked";
    const TOTAL = {link_num};
    const checks = Array.from(document.querySelectorAll(".done-check"));
    const reviewedEl = document.getElementById("reviewed-count");
    const remainingEl = document.getElementById("remaining-count");

    function loadChecked() {{
      try {{
        return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
      }} catch {{
        return new Set();
      }}
    }}

    function saveChecked(checked) {{
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
    }}

    function updateCounts() {{
      const reviewed = checks.filter((cb) => cb.checked).length;
      reviewedEl.textContent = String(reviewed);
      remainingEl.textContent = String(TOTAL - reviewed);
    }}

    function applyState() {{
      const checked = loadChecked();
      checks.forEach((cb) => {{
        cb.checked = checked.has(cb.id);
        cb.closest("tr")?.classList.toggle("reviewed", cb.checked);
      }});
      updateCounts();
    }}

    checks.forEach((cb) => {{
      cb.addEventListener("change", () => {{
        const checked = loadChecked();
        if (cb.checked) checked.add(cb.id);
        else checked.delete(cb.id);
        saveChecked(checked);
        cb.closest("tr")?.classList.toggle("reviewed", cb.checked);
        updateCounts();
      }});
    }});

    document.getElementById("show-remaining").addEventListener("click", () => {{
      checks.forEach((cb) => {{
        const row = cb.closest("tr");
        if (row) row.style.display = cb.checked ? "none" : "";
      }});
    }});

    document.getElementById("show-all").addEventListener("click", () => {{
      document.querySelectorAll("tbody tr").forEach((row) => {{
        row.style.display = "";
      }});
    }});

    document.getElementById("reset-progress").addEventListener("click", () => {{
      if (!confirm("Clear all checkboxes?")) return;
      localStorage.removeItem(STORAGE_KEY);
      checks.forEach((cb) => {{
        cb.checked = false;
        cb.closest("tr")?.classList.remove("reviewed");
        cb.closest("tr")?.style && (cb.closest("tr").style.display = "");
      }});
      updateCounts();
    }});

    applyState();
  </script>
</body>
</html>
"""

OUT.write_text(page, encoding="utf-8")
print(f"Wrote {OUT}")
print(f"Total links: {link_num}")