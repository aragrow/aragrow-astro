// Featured image for /blog/carpet-bombed-with-ai-offers/. Draws an SVG in the site colors and
// renders it to a 640px WebP (quality 60). Usage: node scripts/images/carpet-bombed-with-ai-offers.mjs
import sharp from 'sharp';

const W = 1200, H = 630;
const MAROON = '#7B1818', GOLD = '#E8B931', SLATE = '#94a3b8', BG = '#f8fafc';
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// Left: a carpet of offer cards, scattered and tilted.
const cards = [];
const cols = 7, rows = 6;
for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
  if (rnd() < 0.12) continue;
  const x = 40 + c * 78 + (rnd() - 0.5) * 34;
  const y = 50 + r * 92 + (rnd() - 0.5) * 34;
  const rot = (rnd() - 0.5) * 30;
  const tint = rnd();
  const stroke = tint < 0.2 ? MAROON : SLATE;
  const op = (0.35 + rnd() * 0.5).toFixed(2);
  const lw = 16 + rnd() * 14;
  cards.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)} 30 20)" opacity="${op}">
    <rect width="60" height="42" rx="7" fill="#fff" stroke="${stroke}" stroke-width="2"/>
    <circle cx="13" cy="14" r="5" fill="${stroke}"/>
    <rect x="23" y="11" width="${lw.toFixed(0)}" height="5" rx="2.5" fill="${stroke}"/>
    <rect x="9" y="26" width="42" height="4" rx="2" fill="${stroke}" opacity="0.6"/>
  </g>`);
}

// Right: one target, one precise line.
const cx = 930, cy = 315;
const rings = [150, 115, 80, 45].map((r, i) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${i % 2 ? '#fff' : MAROON}" ${i % 2 ? `stroke="${MAROON}" stroke-width="3"` : ''}/>`).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="${W / 2 + 40}" width="${W / 2 - 40}" height="${H}" fill="#fff"/>
  ${cards.join('\n')}
  <line x1="${W / 2 + 40}" y1="40" x2="${W / 2 + 40}" y2="${H - 40}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 8"/>
  ${rings}
  <circle cx="${cx}" cy="${cy}" r="16" fill="${GOLD}"/>
  <line x1="${W / 2 + 80}" y1="${cy}" x2="${cx - 24}" y2="${cy}" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/>
  <path d="M ${cx - 46} ${cy - 16} L ${cx - 18} ${cy} L ${cx - 46} ${cy + 16} Z" fill="${GOLD}"/>
  <circle cx="${W / 2 + 80}" cy="${cy}" r="7" fill="${GOLD}"/>
</svg>`;

const out = new URL('../../public/images/blog/carpet-bombed-with-ai-offers.webp', import.meta.url).pathname;
const info = await sharp(Buffer.from(svg)).resize(640).webp({ quality: 60, effort: 6 }).toFile(out);
console.log(`${out}: ${info.width}x${info.height}, ${info.size} bytes`);
