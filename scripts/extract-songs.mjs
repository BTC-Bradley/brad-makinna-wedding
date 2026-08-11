import { readFileSync, writeFileSync } from "fs";
import { CosmosClient } from "@azure/cosmos";

const envText = readFileSync(".env.local", "utf8");
for (const line of envText.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  let val = trimmed.slice(eq + 1).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  process.env[key] = val;
}

const client = new CosmosClient({
  connectionString: process.env.COSMOS_CONNECTION_STRING,
});
const db = client.database(process.env.COSMOS_DATABASE_NAME);
const rsvpsContainer = db.container(process.env.COSMOS_RSVPS_CONTAINER_NAME);
const guestsContainer = db.container(process.env.COSMOS_CONTAINER_NAME);

const [rsvpResult, guestResult] = await Promise.all([
  rsvpsContainer.items.query("SELECT * FROM c").fetchAll(),
  guestsContainer.items.query("SELECT c.id, c.names FROM c").fetchAll(),
]);

const rsvps = rsvpResult.resources;
const guestMap = Object.fromEntries(
  guestResult.resources.map((g) => [g.id, g.names]),
);

function isYouTubeUrl(text) {
  return /youtube\.com|youtu\.be/i.test(text);
}

function getYouTubeVideoId(url) {
  const patterns = [
    /youtu\.be\/([^?&\s]+)/,
    /youtube\.com\/watch\?v=([^&\s]+)/,
    /youtube\.com\/embed\/([^?&\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

async function getYouTubeTitle(url) {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.title ?? null;
  } catch {
    return null;
  }
}

const seenGuestIds = new Set();
const byGuest = [];
const consolidated = [];

for (const rsvp of rsvps) {
  if (!rsvp.additionalNotes?.trim()) continue;
  if (rsvp.additionalNotes.includes("Same song requests")) continue;
  if (seenGuestIds.has(rsvp.guestId)) continue;
  seenGuestIds.add(rsvp.guestId);

  const name = rsvp.submittedBy || guestMap[rsvp.guestId] || "Unknown Guest";
  const songs = [];

  for (const line of rsvp.additionalNotes.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.includes("These are all links")) continue;

    const isYouTube = isYouTubeUrl(trimmed);
    let title = null;
    if (isYouTube) {
      title = await getYouTubeTitle(trimmed);
    }

    const entry = {
      raw: trimmed,
      display: title || trimmed,
      isYouTube,
      videoId: isYouTube ? getYouTubeVideoId(trimmed) : null,
      url: isYouTube ? trimmed : null,
    };
    songs.push(entry);
    consolidated.push({ ...entry, requestedBy: name });
  }

  if (songs.length > 0) byGuest.push({ name, songs });
}

const lines = [];
lines.push("# Wedding Song Requests");
lines.push("");
lines.push(
  `**${byGuest.length} guests** submitted **${consolidated.length} song suggestions** (as of ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })})`,
);
lines.push("");
lines.push("---");
lines.push("");
lines.push("## Consolidated List");
lines.push("");

let num = 1;
for (const song of consolidated) {
  if (song.isYouTube) {
    lines.push(
      `${num}. **${song.display}** — [YouTube](${song.url}) *(requested by ${song.requestedBy})*`,
    );
  } else {
    lines.push(`${num}. **${song.display}** *(requested by ${song.requestedBy})*`);
  }
  num++;
}

lines.push("");
lines.push("---");
lines.push("");
lines.push("## By Guest");
lines.push("");

for (const guest of byGuest) {
  lines.push(`### ${guest.name}`);
  for (const song of guest.songs) {
    if (song.isYouTube) {
      lines.push(`- ${song.display} — ${song.url}`);
    } else {
      lines.push(`- ${song.display}`);
    }
  }
  lines.push("");
}

const outPath = "song-requests.md";
writeFileSync(outPath, lines.join("\n"), "utf8");

const jsonPath = "song-requests.json";
writeFileSync(
  jsonPath,
  JSON.stringify({ totalGuests: byGuest.length, totalSongs: consolidated.length, byGuest, consolidated }, null, 2),
  "utf8",
);

console.log(`Wrote ${outPath} and ${jsonPath}`);
console.log(`Total: ${consolidated.length} songs from ${byGuest.length} guests`);