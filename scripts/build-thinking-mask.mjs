// Converts the dithered portrait RLE dump into the 1-bit PNG the homepage
// thinking field decodes at runtime. Usage:
//   node scripts/build-thinking-mask.mjs <portrait.rle.json> [out.png]
import { readFileSync, writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const [source, out = 'public/images/thinking-mask.png'] = process.argv.slice(2)
if (!source) {
    console.error('usage: node scripts/build-thinking-mask.mjs <rle.json> [out.png]')
    process.exit(1)
}

const { width, height, rows } = JSON.parse(readFileSync(source, 'utf8'))
if (rows.length !== height) throw new Error(`expected ${height} rows`)

const bytesPerRow = Math.ceil(width / 8)
const raw = Buffer.alloc((bytesPerRow + 1) * height)
for (let y = 0; y < height; y++) {
    const rowStart = y * (bytesPerRow + 1) + 1
    raw.fill(0xff, rowStart, rowStart + bytesPerRow)
    for (const [start, length] of rows[y]) {
        for (let x = start; x < start + length; x++) {
            raw[rowStart + (x >> 3)] &= ~(0x80 >> (x & 7))
        }
    }
}

const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    return c >>> 0
})
const crc = buffer =>
    (buffer.reduce((c, byte) => crcTable[(c ^ byte) & 0xff] ^ (c >>> 8), 0xffffffff) ^
        0xffffffff) >>>
    0

const chunk = (type, data) => {
    const head = Buffer.alloc(8)
    head.writeUInt32BE(data.length)
    head.write(type, 4, 'ascii')
    const tail = Buffer.alloc(4)
    tail.writeUInt32BE(crc(Buffer.concat([head.subarray(4), data])))
    return Buffer.concat([head, data, tail])
}

const header = Buffer.alloc(13)
header.writeUInt32BE(width, 0)
header.writeUInt32BE(height, 4)
header[8] = 1 // bit depth
header[9] = 0 // greyscale
const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
])
writeFileSync(out, png)
console.log(`${out}: ${width}x${height}, ${png.length} bytes`)
