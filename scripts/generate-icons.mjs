import { createRequire } from 'node:module'
import { mkdir, writeFile } from 'node:fs/promises'

// Use the SVG renderer already installed with Astro; no runtime dependency.
const require = createRequire(import.meta.url)
const sharp = createRequire(require.resolve('astro/package.json'))('sharp')
const ink = '#080909'
const paper = '#f7eae8'
const cream = '#fff4e6'
const blue = '#244bd8'
// Two closed shapes: the diagonal remains open at both ends at favicon size.
const mark =
    'M2 2H9L8 5H5V11H6L5 14H2Z M11 2C13 3 14 5 14 8C14 12 12 14 8 14H7L8 11C10 11 11 10 11 8C11 6.5 10.5 5.5 10 5Z'
const glyph = (color = ink, d = mark) =>
    `<path fill="${color}" fill-rule="evenodd" d="${d}"/>`
const svg = (body, size = 16) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${body}</svg>\n`
const tile = (padding = false) =>
    svg(
        `<path fill="${paper}" d="M0 0H16V16H0Z"/><g${padding ? ' transform="translate(3 3) scale(.625)"' : ''}>${glyph()}</g>`,
    )
await mkdir('brand', { recursive: true })
await mkdir('public', { recursive: true })
for (const [name, color] of [
    ['black', ink],
    ['cream', cream],
    ['blue', blue],
]) {
    await writeFile(
        `brand/dv-cut-${name}.svg`,
        svg(`<title>Daniel Vieira — DV cut</title>${glyph(color)}`),
    )
}
await writeFile(
    'brand/dv-cut-reversed.svg',
    svg(`<path fill="${ink}" d="M0 0H16V16H0Z"/>${glyph(cream)}`),
)
await writeFile(
    'public/favicon.svg',
    svg(
        `<style>path{fill:${ink}}@media(prefers-color-scheme:dark){path{fill:${cream}}}</style>${glyph()}`,
    ),
)
for (const size of [16, 24, 32, 48, 64]) {
    await sharp(Buffer.from(tile()))
        .resize(size, size)
        .png()
        .toFile(`public/favicon-${size}x${size}.png`)
}
for (const [file, size, maskable] of [
    ['apple-touch-icon.png', 180, false],
    ['android-chrome-192x192.png', 192, false],
    ['android-chrome-512x512.png', 512, false],
    ['icon-maskable-512x512.png', 512, true],
]) {
    await sharp(Buffer.from(tile(maskable)))
        .resize(size, size)
        .png()
        .toFile(`public/${file}`)
}
// ICO directory with conventional uncompressed 32-bit DIB images and AND masks.
const frames = []
for (const size of [16, 32, 48]) {
    const pixels = await sharp(Buffer.from(tile()))
        .resize(size, size)
        .ensureAlpha()
        .raw()
        .toBuffer()
    const stride = Math.ceil(size / 32) * 4
    const dib = Buffer.alloc(40 + size * size * 4 + stride * size)
    dib.writeUInt32LE(40, 0)
    dib.writeInt32LE(size, 4)
    dib.writeInt32LE(size * 2, 8)
    dib.writeUInt16LE(1, 12)
    dib.writeUInt16LE(32, 14)
    dib.writeUInt32LE(size * size * 4, 20)
    for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++) {
            const src = (y * size + x) * 4
            const dest = 40 + ((size - y - 1) * size + x) * 4
            dib[dest] = pixels[src + 2]
            dib[dest + 1] = pixels[src + 1]
            dib[dest + 2] = pixels[src]
            dib[dest + 3] = pixels[src + 3]
        }
    frames.push({ size, dib })
}
const header = Buffer.alloc(6 + frames.length * 16)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(frames.length, 4)
let offset = header.length
frames.forEach(({ size, dib }, i) => {
    const at = 6 + i * 16
    header[at] = size
    header[at + 1] = size
    header.writeUInt16LE(1, at + 4)
    header.writeUInt16LE(32, at + 6)
    header.writeUInt32LE(dib.length, at + 8)
    header.writeUInt32LE(offset, at + 12)
    offset += dib.length
})
await writeFile(
    'public/favicon.ico',
    Buffer.concat([header, ...frames.map(frame => frame.dib)]),
)

// Vector PDF from the same absolute SVG path commands (no raster artwork).
const tokens = mark.match(/[MLHVCZ]|-?\d*\.?\d+/g)
let x = 0,
    y = 0,
    commands = [],
    i = 0
while (i < tokens.length) {
    const command = tokens[i++]
    if (command === 'Z') {
        commands.push('h')
        continue
    }
    if (command === 'H') {
        x = Number(tokens[i++])
        commands.push(`${x} ${y} l`)
        continue
    }
    if (command === 'V') {
        y = Number(tokens[i++])
        commands.push(`${x} ${y} l`)
        continue
    }
    if (command === 'C') {
        const values = tokens.slice(i, i + 6).map(Number)
        i += 6
        x = values[4]
        y = values[5]
        commands.push(`${values.join(' ')} c`)
        continue
    }
    x = Number(tokens[i++])
    y = Number(tokens[i++])
    commands.push(`${x} ${y} ${command === 'M' ? 'm' : 'l'}`)
}
const stream = `q\n32 0 0 -32 0 512 cm\n0.031373 0.035294 0.035294 rg\n${commands.join('\n')}\nf\nQ\n`
const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 512 512] /Resources << >> /Contents 4 0 R >>',
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`,
]
let pdf = '%PDF-1.4\n',
    offsets = [0]
objects.forEach((body, i) => {
    offsets.push(Buffer.byteLength(pdf))
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`
})
const xref = Buffer.byteLength(pdf)
pdf += `xref\n0 5\n0000000000 65535 f \n${offsets
    .slice(1)
    .map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`)
    .join('')}trailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`
await writeFile('brand/dv-cut-master.pdf', pdf)

const candidates = [
    ['01 / Shared diagonal', 'M2 2H8L12 6L10 10L8 6H5V11H8L12 2H15L10 14H2Z'],
    ['02 / Condensed cut — selected', mark],
    ['03 / Negative V', 'M2 2H6L8 9L10 2H12L14 6V10L10 14H2Z M5 10V12H7Z'],
    ['04 / Slash dominant', 'M2 2H10L9 5H5V11H7L6 14H2Z M12 2H15L11 14H8Z'],
    [
        '05 / Squared D cut',
        'M2 2H9L8 5H5V11H6L5 14H2Z M11 2L14 5V11L11 14H7L8 11H11V5H10Z',
    ],
    [
        '06 / Registration D',
        'M2 2H7C11 2 12 5 12 8C12 11 11 14 7 14H2Z M5 5V11H7C9 11 9 9 9 8C9 7 9 5 7 5Z M13 2H15V4H13Z',
    ],
]
let sheet = `<rect width="960" height="1000" fill="${paper}"/><style>text{font-family:Arial,sans-serif;fill:${ink}}</style><text x="40" y="48" font-size="26">DV / Cut monogram</text><text x="40" y="77" font-size="14">Six constructions. One colour. Actual-size 32 px and 16 px proofs.</text>`
candidates.forEach(([label, d], i) => {
    const x = 40 + (i % 3) * 300,
        y = 112 + Math.floor(i / 3) * 285
    sheet += `<g transform="translate(${x} ${y})"><text y="18" font-size="13">${label}</text><g transform="translate(0 40) scale(8)">${glyph(ink, d)}</g><g transform="translate(155 40) scale(2)">${glyph(ink, d)}</g><g transform="translate(210 40)">${glyph(ink, d)}</g><rect y="182" width="268" height="72" fill="${ink}"/><g transform="translate(14 194) scale(3)">${glyph(cream, d)}</g><g transform="translate(155 202) scale(2)">${glyph(cream, d)}</g><g transform="translate(210 210)">${glyph(cream, d)}</g></g>`
})
sheet += `<text x="40" y="735" font-size="20">Selected / 16–192 px (512 px proof supplied separately)</text>`
let cursor = 40
for (const size of [16, 24, 32, 48, 64, 180, 192]) {
    sheet += `<g transform="translate(${cursor} 766) scale(${size / 16})">${glyph()}</g><text x="${cursor}" y="980" font-size="12">${size}</text>`
    cursor += size + 25
}
await writeFile(
    'brand/exploration.svg',
    (sheet = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 1000">${sheet}</svg>`),
)
await sharp(Buffer.from(sheet)).png().toFile('brand/exploration.png')
const proof = svg(`<path fill="${paper}" d="M0 0H16V16H0Z"/>${glyph()}`)
await sharp(Buffer.from(proof))
    .resize(512)
    .png()
    .toFile('brand/dv-cut-preview.png')
console.log(
    'Generated vector masters, exploration sheet, favicon sizes, ICO, and app icons.',
)
