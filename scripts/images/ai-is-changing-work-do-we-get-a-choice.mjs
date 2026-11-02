// Featured image for /blog/ai-is-changing-work-do-we-get-a-choice/. Draws an SVG in the site
// colors and renders it to a 640px WebP (quality 60). An AI gatekeeper stands at a gate and
// drops gold onto the pan it controls, while a person is weighed on the other side: AI deciding
// what each person is granted, in the shape of the Egyptian weighing of the heart.
// Usage: node scripts/images/ai-is-changing-work-do-we-get-a-choice.mjs
import sharp from 'sharp';

const W = 1200, H = 630, MAROON = '#7B1818', GOLD = '#E8B931', SLATE = '#64748b', LIGHT = '#f8fafc';

const coin = (cx, cy, rx = 42) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * 0.31}" fill="${GOLD}" stroke="#b8860b" stroke-width="2"/>`;

// A shallow pan: a flat top line and the bottom half of an ellipse.
const pan = (cx, cy, w = 150) =>
  `<line x1="${cx - w / 2}" y1="${cy}" x2="${cx + w / 2}" y2="${cy}" stroke="${MAROON}" stroke-width="4" stroke-linecap="round"/>` +
  `<path d="M ${cx - w / 2} ${cy} A ${w / 2} ${w * 0.28} 0 0 0 ${cx + w / 2} ${cy}" fill="none" stroke="${MAROON}" stroke-width="4"/>`;

const person = (cx, cy) =>
  `<g fill="${SLATE}"><circle cx="${cx}" cy="${cy - 62}" r="18"/>` +
  `<path d="M ${cx - 22} ${cy} Q ${cx - 22} ${cy - 40} ${cx} ${cy - 40} Q ${cx + 22} ${cy - 40} ${cx + 22} ${cy} Z"/></g>`;

// A robot head centered at (cx, cy): antenna, side ears, dark visor with two gold eyes.
function robotHead(cx, cy, w) {
  const h = w * 0.82, x = cx - w / 2, y = cy - h / 2;
  return `<line x1="${cx}" y1="${y - 26}" x2="${cx}" y2="${y}" stroke="${MAROON}" stroke-width="4"/>` +
    `<circle cx="${cx}" cy="${y - 30}" r="7" fill="${GOLD}"/>` +
    `<rect x="${x - 10}" y="${cy - 14}" width="10" height="28" rx="4" fill="${MAROON}"/>` +
    `<rect x="${x + w}" y="${cy - 14}" width="10" height="28" rx="4" fill="${MAROON}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${MAROON}"/>` +
    `<rect x="${x + 12}" y="${cy - 16}" width="${w - 24}" height="30" rx="12" fill="#2b0a0a"/>` +
    `<circle cx="${cx - w * 0.17}" cy="${cy - 1}" r="7" fill="${GOLD}"/>` +
    `<circle cx="${cx + w * 0.17}" cy="${cy - 1}" r="7" fill="${GOLD}"/>`;
}

// Scale geometry. The gold side hangs lower: the AI has weighted it.
const pivot = { x: 770, y: 200 }, lend = { x: 620, y: 238 }, rend = { x: 920, y: 162 };
const lp = { x: 620, y: 400 }, rp = { x: 920, y: 330 };
// Robot figure.
const rb = { cx: 360, headY: 300, headW: 120 };

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${LIGHT}"/>

  <!-- gate -->
  <rect x="150" y="70" width="930" height="44" fill="#eadfe0"/>
  <rect x="170" y="110" width="60" height="470" fill="#eadfe0"/>
  <rect x="1000" y="110" width="60" height="470" fill="#eadfe0"/>
  <rect x="150" y="560" width="930" height="20" fill="#e2d6d7"/>

  <!-- scale -->
  <rect x="${pivot.x - 70}" y="556" width="140" height="18" rx="7" fill="${MAROON}"/>
  <rect x="${pivot.x - 11}" y="${pivot.y}" width="22" height="360" fill="${MAROON}"/>
  <polygon points="${pivot.x},${pivot.y - 24} ${pivot.x - 22},${pivot.y + 5} ${pivot.x + 22},${pivot.y + 5}" fill="${MAROON}"/>
  <line x1="${lend.x}" y1="${lend.y}" x2="${rend.x}" y2="${rend.y}" stroke="${MAROON}" stroke-width="9" stroke-linecap="round"/>
  <line x1="${lend.x}" y1="${lend.y}" x2="${lp.x - 68}" y2="${lp.y}" stroke="${MAROON}" stroke-width="2"/>
  <line x1="${lend.x}" y1="${lend.y}" x2="${lp.x + 68}" y2="${lp.y}" stroke="${MAROON}" stroke-width="2"/>
  <line x1="${rend.x}" y1="${rend.y}" x2="${rp.x - 68}" y2="${rp.y}" stroke="${MAROON}" stroke-width="2"/>
  <line x1="${rend.x}" y1="${rend.y}" x2="${rp.x + 68}" y2="${rp.y}" stroke="${MAROON}" stroke-width="2"/>
  ${coin(lp.x, lp.y - 14)}${coin(lp.x, lp.y - 28)}${coin(lp.x, lp.y - 42)}${pan(lp.x, lp.y)}
  ${person(rp.x, rp.y)}${pan(rp.x, rp.y)}

  <!-- AI gatekeeper: legs, torso, neck, head, arm dropping a coin over the gold pan -->
  <rect x="${rb.cx - 40}" y="520" width="26" height="40" rx="6" fill="${MAROON}"/>
  <rect x="${rb.cx + 14}" y="520" width="26" height="40" rx="6" fill="${MAROON}"/>
  <rect x="${rb.cx - 65}" y="378" width="130" height="150" rx="26" fill="${MAROON}"/>
  <rect x="${rb.cx - 15}" y="${rb.headY + 40}" width="30" height="24" fill="${MAROON}"/>
  ${robotHead(rb.cx, rb.headY, rb.headW)}
  <path d="M ${rb.cx + 55} 410 Q 500 420 560 372" fill="none" stroke="${MAROON}" stroke-width="22" stroke-linecap="round"/>
  <circle cx="560" cy="372" r="15" fill="${MAROON}"/>
  ${coin(598, 340, 22)}
</svg>`;

const out = new URL('../../public/images/blog/ai-is-changing-work-do-we-get-a-choice.webp', import.meta.url).pathname;
const info = await sharp(Buffer.from(svg)).resize(640).webp({ quality: 60, effort: 6 }).toFile(out);
await sharp(Buffer.from(svg)).png().toFile(new URL('./ai-is-changing-work-preview.png', import.meta.url).pathname);
console.log(`${out}: ${info.width}x${info.height}, ${info.size} bytes`);
