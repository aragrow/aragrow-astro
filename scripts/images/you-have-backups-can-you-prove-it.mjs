// Alternative, text-free illustration for /blog/you-have-backups-can-you-prove-it/.
// Draws an SVG in the site colors and renders it to a 640px WebP (quality 60). Not the published
// featured image for that post, which is a photo.
// Usage: node scripts/images/you-have-backups-can-you-prove-it.mjs
import sharp from 'sharp';

const W = 1200, H = 630;
const MAROON = '#7B1818', GOLD = '#E8B931', SLATE = '#94a3b8', BG = '#f8fafc';

// ---- Left: a handbrake lever, pulled up, with the lowered position ghosted behind it.
const PX = 215, PY = 432;            // lever pivot
const deg = (d) => (d * Math.PI) / 180;
const pt = (angle, len) => [PX + len * Math.cos(deg(angle)), PY - len * Math.sin(deg(angle))];

const [upX, upY] = pt(46, 250);      // raised lever tip
const [downX, downY] = pt(8, 250);   // lowered lever tip (ghost)
const [arcSX, arcSY] = pt(8, 272);
const [arcEX, arcEY] = pt(46, 272);

const lever = `
  <line x1="${PX}" y1="${PY}" x2="${downX.toFixed(1)}" y2="${downY.toFixed(1)}"
        stroke="${SLATE}" stroke-width="16" stroke-linecap="round" opacity="0.3"/>
  <path d="M ${arcSX.toFixed(1)} ${arcSY.toFixed(1)} A 272 272 0 0 0 ${arcEX.toFixed(1)} ${arcEY.toFixed(1)}"
        fill="none" stroke="${SLATE}" stroke-width="3" stroke-dasharray="7 9" opacity="0.8"/>
  <line x1="${PX}" y1="${PY}" x2="${upX.toFixed(1)}" y2="${upY.toFixed(1)}"
        stroke="${SLATE}" stroke-width="20" stroke-linecap="round"/>
  <g transform="translate(${upX.toFixed(1)} ${upY.toFixed(1)}) rotate(-46)">
    <rect x="-34" y="-21" width="104" height="42" rx="21" fill="${MAROON}"/>
    <circle cx="56" cy="0" r="11" fill="${GOLD}"/>
  </g>
  <path d="M 135 432 h 190 l 28 86 h -246 z" fill="${MAROON}"/>
  <rect x="101" y="510" width="252" height="26" rx="13" fill="${MAROON}" opacity="0.85"/>
  <circle cx="${PX}" cy="${PY}" r="13" fill="${BG}" stroke="${MAROON}" stroke-width="5"/>
`;

// ---- Right: a stack of drives with the top one lifted out and checked.
const CX = 910;
const drive = (x, y, rot = 0, op = 1) => `
  <g transform="translate(${x} ${y}) rotate(${rot})" opacity="${op}">
    <rect x="-130" y="-29" width="260" height="58" rx="11" fill="#fff" stroke="${MAROON}" stroke-width="3"/>
    <circle cx="-104" cy="0" r="8" fill="${SLATE}"/>
    <rect x="-82" y="-9" width="112" height="7" rx="3.5" fill="${SLATE}" opacity="0.65"/>
    <rect x="-82" y="4" width="68" height="7" rx="3.5" fill="${SLATE}" opacity="0.45"/>
    <rect x="86" y="-13" width="30" height="26" rx="5" fill="${SLATE}" opacity="0.3"/>
  </g>`;

const emptySlot = `
  <rect x="${CX - 130}" y="${330 - 29}" width="260" height="58" rx="11"
        fill="none" stroke="${SLATE}" stroke-width="3" stroke-dasharray="8 8" opacity="0.65"/>`;

const check = `
  <g transform="translate(${CX + 150} 182)">
    <circle r="31" fill="${GOLD}"/>
    <path d="M -14 1 L -4 12 L 15 -11" fill="none" stroke="#fff" stroke-width="7"
          stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

const pullArrow = `
  <path d="M ${CX - 164} 318 C ${CX - 214} 268 ${CX - 214} 222 ${CX - 170} 196"
        fill="none" stroke="${GOLD}" stroke-width="5" stroke-dasharray="9 9" stroke-linecap="round"/>
  <path d="M ${CX - 186} 206 L ${CX - 166} 188 L ${CX - 150} 210 Z" fill="${GOLD}"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="640" width="${W - 640}" height="${H}" fill="#fff"/>
  <line x1="640" y1="46" x2="640" y2="${H - 46}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 8"/>
  ${lever}
  ${emptySlot}
  ${drive(CX, 400)}
  ${drive(CX, 470)}
  ${drive(CX, 540, 0, 0.5)}
  ${pullArrow}
  ${drive(CX, 190, -7)}
  ${check}
</svg>`;

const base = new URL('../../', import.meta.url).pathname;
// Writes the -illustration variant on purpose: the published featured image for this post is a
// photo, and this script must not overwrite it.
const slug = 'you-have-backups-can-you-prove-it-illustration';

await sharp(Buffer.from(svg)).resize(900).png().toFile(`${base}scripts/images/${slug}-preview.png`);
const info = await sharp(Buffer.from(svg))
  .resize(640)
  .webp({ quality: 60, effort: 6 })
  .toFile(`${base}public/images/blog/${slug}.webp`);
console.log(`${slug}.webp: ${info.width}x${info.height}, ${info.size} bytes`);
