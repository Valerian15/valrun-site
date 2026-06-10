/* One-off image optimizer: recompresses public JPEGs in place (mozjpeg,
 * progressive) and emits small favicon/logo PNGs from valrun-tree.png.
 * Run: node scripts/optimize-images.mjs */
import sharp from "sharp";
import { readdir, stat, rename } from "node:fs/promises";
import path from "node:path";

const JPEG_DIRS = ["public/hero", "public/peoples"];
const SINGLE_JPEGS = ["public/map.jpg"];

async function recompress(file) {
  const before = (await stat(file)).size;
  const tmp = file + ".tmp";
  await sharp(file).jpeg({ quality: 72, progressive: true, mozjpeg: true }).toFile(tmp);
  const after = (await stat(tmp)).size;
  if (after < before * 0.95) {
    await rename(tmp, file);
    console.log(`${file}: ${(before / 1024) | 0}KB -> ${(after / 1024) | 0}KB`);
  } else {
    const { unlink } = await import("node:fs/promises");
    await unlink(tmp);
    console.log(`${file}: kept original (${(before / 1024) | 0}KB)`);
  }
}

for (const dir of JPEG_DIRS) {
  for (const f of await readdir(dir)) {
    if (f.endsWith(".jpg")) await recompress(path.join(dir, f));
  }
}
for (const f of SINGLE_JPEGS) await recompress(f);

await sharp("public/valrun-tree.png").resize(64, 64).png().toFile("public/favicon-64.png");
await sharp("public/valrun-tree.png").resize(160, 160).png().toFile("public/valrun-tree-160.png");
console.log("favicon-64.png and valrun-tree-160.png written");
