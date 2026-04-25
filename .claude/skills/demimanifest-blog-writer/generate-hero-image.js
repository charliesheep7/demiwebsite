#!/usr/bin/env node

/**
 * Demi Blog Hero Image Generator (static gradient + grain)
 *
 * Generates a 1200x630 hero image: a linear gradient drawn from Demi's brand
 * palette (cream / lavender / blush / yellow), with a strong "magical" grain
 * overlay via SVG feTurbulence. Deterministic from the slug — same slug always
 * produces the same image — so regenerating is stable.
 *
 * Usage:
 *   node generate-hero-image.js <slug> [palette] [title]
 *
 * Palettes: lavender-dawn | blush-dusk | cream-halo | yellow-morning |
 *           lavender-blush | midnight-lav | (default: auto — hashed from slug)
 *
 * Title: 3-5 words rendered centered in a large italic serif. If omitted,
 * derived from the slug (kebab-case → Title Case, trimmed to first 5 words).
 *
 * Output: public/blog/<slug>/hero.jpg  (in /Users/sihancheng/Projects/demimanifest)
 *
 * Dependencies: sharp (already in the demimanifest project's node_modules
 * because Next.js ships with it).
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const PROJECT_ROOT = process.env.DEMI_PROJECT_ROOT || '/home/user/demiwebsite'
const WIDTH = 1200
const HEIGHT = 630

// Demi brand tokens (from css/tailwind.css)
const C = {
  cream: '#faf4ea',
  cream2: '#f5ecdc',
  creamDeep: '#ede0c8',
  ink: '#2a2339',
  ink2: '#564a6a',
  inkDim: '#8a7e9c',
  lav50: '#f3efff',
  lav100: '#e6deff',
  lav200: '#cfc0ff',
  lav300: '#b29cf5',
  lav400: '#9578e0',
  lav500: '#7a58c9',
  yel50: '#fff7d6',
  yel100: '#ffecab',
  yel200: '#ffdf7a',
  yel300: '#ffc94a',
  blush: '#f4a7b9',
  blushDeep: '#d97a94',
}

// Curated palettes. `ink` = text color that contrasts this palette.
const PALETTES = {
  'lavender-dawn': {
    angle: 135,
    stops: [C.cream, C.lav50, C.lav200, C.lav300],
    glowColor: C.yel200,
    glowPos: { cx: 78, cy: 28 },
    ink: C.ink,
  },
  'blush-dusk': {
    angle: 160,
    stops: [C.cream2, C.blush, C.lav200, C.lav400],
    glowColor: C.yel100,
    glowPos: { cx: 22, cy: 30 },
    ink: C.ink,
  },
  'cream-halo': {
    angle: 115,
    stops: [C.cream, C.cream2, C.creamDeep, C.lav100],
    glowColor: C.yel200,
    glowPos: { cx: 70, cy: 22 },
    ink: C.ink,
  },
  'yellow-morning': {
    angle: 150,
    stops: [C.yel50, C.cream, C.lav100, C.lav300],
    glowColor: C.yel300,
    glowPos: { cx: 80, cy: 20 },
    ink: C.ink,
  },
  'lavender-blush': {
    angle: 145,
    stops: [C.lav50, C.lav100, C.blush, C.lav300],
    glowColor: C.yel100,
    glowPos: { cx: 25, cy: 25 },
    ink: C.ink,
  },
  'midnight-lav': {
    angle: 155,
    stops: [C.lav100, C.lav300, C.lav500, C.ink2],
    glowColor: C.yel200,
    glowPos: { cx: 75, cy: 25 },
    ink: C.cream,
  },
}

function hashPick(str, arr) {
  const hash = crypto.createHash('sha256').update(str).digest()
  return arr[hash[0] % arr.length]
}

function angleToPoints(angle) {
  // SVG linearGradient wants x1/y1/x2/y2 in userSpace units.
  // Convert degrees (CSS convention: 0deg = up, 90deg = right) to coords.
  const rad = ((angle - 90) * Math.PI) / 180
  const dx = Math.cos(rad)
  const dy = Math.sin(rad)
  const x1 = 50 - dx * 50
  const y1 = 50 - dy * 50
  const x2 = 50 + dx * 50
  const y2 = 50 + dy * 50
  return { x1: `${x1}%`, y1: `${y1}%`, x2: `${x2}%`, y2: `${y2}%` }
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .slice(0, 5)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}

// Wrap by character budget, not word count. Roman Georgia averages ~0.52 *
// fontSize per char. Default budget targets a ~40%-wide title block.
function wrapTitle(title, maxCharsPerLine = 14) {
  const words = title.trim().split(/\s+/).slice(0, 5)
  const joined = words.join(' ')
  if (joined.length <= maxCharsPerLine) return [joined]

  // Find the split point that best balances line lengths while staying under budget.
  let best = null
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ')
    const b = words.slice(i).join(' ')
    const longest = Math.max(a.length, b.length)
    if (!best || longest < best.longest) best = { a, b, longest }
  }
  return [best.a, best.b]
}

// Pick a font size that fits the longest line inside the target block width.
// Title stays within ~40% of canvas width per brand direction.
const TITLE_MAX_WIDTH = Math.floor(WIDTH * 0.4)

function fitFontSize(lines, maxPx = TITLE_MAX_WIDTH) {
  // Roman Georgia char width ≈ 0.52 * fontSize. Start at 80, shrink if needed.
  const longest = lines.reduce((m, l) => Math.max(m, l.length), 0)
  const base = lines.length === 1 ? 80 : 68
  const projected = longest * base * 0.52
  if (projected <= maxPx) return base
  return Math.floor((maxPx / (longest * 0.52)) * 0.98)
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSvg(slug, paletteName, titleArg) {
  const name = paletteName || hashPick(slug, Object.keys(PALETTES))
  const p = PALETTES[name]
  if (!p) throw new Error(`Unknown palette: ${paletteName}`)

  const title = titleArg ? titleArg.trim() : slugToTitle(slug)
  const titleLines = wrapTitle(title)

  const pts = angleToPoints(p.angle)
  const stops = p.stops
    .map((c, i) => {
      const offset = (i / (p.stops.length - 1)) * 100
      return `<stop offset="${offset.toFixed(1)}%" stop-color="${c}" />`
    })
    .join('')

  // Deterministic turbulence seed per slug so the grain is stable.
  const seed = parseInt(crypto.createHash('md5').update(slug).digest('hex').slice(0, 4), 16) % 9999

  // Title typography — size adapts to fit within WIDTH - 160px padding.
  const titleSize = fitFontSize(titleLines)
  const lineHeight = titleSize * 1.05
  const titleBlockH = lineHeight * titleLines.length
  const titleYStart = HEIGHT / 2 - titleBlockH / 2 + titleSize * 0.82
  const inkColor = p.ink
  const shadowOpacity = inkColor === C.cream ? 0.45 : 0.18

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="${WIDTH / 2}" y="${titleYStart + i * lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join('')

  // Grain layers — cranked up: stronger fine grain, darker shimmer, an added
  // coarse drift, and a high-freq sparkle for the "magical" read.
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="${pts.x1}" y1="${pts.y1}" x2="${pts.x2}" y2="${pts.y2}">
      ${stops}
    </linearGradient>

    <radialGradient id="glow" cx="${p.glowPos.cx}%" cy="${p.glowPos.cy}%" r="55%">
      <stop offset="0%" stop-color="${p.glowColor}" stop-opacity="0.55" />
      <stop offset="45%" stop-color="${p.glowColor}" stop-opacity="0.15" />
      <stop offset="100%" stop-color="${p.glowColor}" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.28" />
    </radialGradient>

    <!-- Fine film grain — strong -->
    <filter id="grainFine" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="1.9" numOctaves="2" seed="${seed}" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 0
                                            0 0 0 0 0
                                            0 0 0 0 0
                                            0 0 0 1.0 0" />
    </filter>

    <!-- Mid-frequency sparkle — the "magical" layer -->
    <filter id="grainSparkle" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed="${seed + 2}" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 1
                                            0 0 0 0 1
                                            0 0 0 0 1
                                            0 0 0 0.75 0" />
    </filter>

    <!-- Coarse drift — low-freq clouds -->
    <filter id="grainSoft" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="${seed + 1}" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 1
                                            0 0 0 0 1
                                            0 0 0 0 1
                                            0 0 0 0.55 0" />
    </filter>
  </defs>

  <!-- Base gradient -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />

  <!-- Warm glow (sun / halo) -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />

  <!-- Coarse cloud drift -->
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grainSoft)" opacity="0.55" style="mix-blend-mode: overlay" />

  <!-- Magical mid-freq sparkle -->
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grainSparkle)" opacity="0.38" style="mix-blend-mode: soft-light" />

  <!-- Strong fine film grain -->
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grainFine)" opacity="0.55" style="mix-blend-mode: overlay" />

  <!-- Vignette -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)" />

  <!-- Serif title — Instrumental Serif (system), roman, ~40% canvas width -->
  <text text-anchor="middle"
        font-family="'Instrumental Serif', 'Cochin', 'Iowan Old Style', serif"
        font-style="normal"
        font-weight="400"
        font-size="${titleSize}"
        letter-spacing="-0.5"
        fill="${inkColor}"
        opacity="0.96"
        style="paint-order: stroke; filter: drop-shadow(0 2px 18px rgba(42,35,57,${shadowOpacity}));">
    ${titleTspans}
  </text>
</svg>`
}

async function main() {
  const slug = process.argv[2]
  const paletteArg = process.argv[3]
  const titleArg = process.argv[4]

  if (!slug) {
    console.error('Usage: node generate-hero-image.js <slug> [palette] [title]')
    console.error(`Palettes: ${Object.keys(PALETTES).join(', ')}`)
    process.exit(1)
  }

  let sharp
  try {
    sharp = require(path.join(PROJECT_ROOT, 'node_modules', 'sharp'))
  } catch {
    try {
      sharp = require('sharp')
    } catch {
      console.error('Error: sharp is not installed.')
      console.error(`Install it in ${PROJECT_ROOT} or globally: npm i sharp`)
      process.exit(1)
    }
  }

  const svg = buildSvg(slug, paletteArg, titleArg)
  const outputDir = path.join(PROJECT_ROOT, 'public', 'blog', slug)
  const outputPath = path.join(outputDir, 'hero.jpg')
  fs.mkdirSync(outputDir, { recursive: true })

  await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(outputPath)

  const stats = fs.statSync(outputPath)
  const sizeKB = (stats.size / 1024).toFixed(1)
  const pickedPalette = paletteArg || hashPick(slug, Object.keys(PALETTES))

  console.log('SUCCESS')
  console.log(`Slug:            ${slug}`)
  console.log(`Palette:         ${pickedPalette}`)
  console.log(`Image saved:     ${outputPath}`)
  console.log(`File size:       ${sizeKB} KB`)
  console.log(`Frontmatter use: image: '/blog/${slug}/hero.jpg'`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
