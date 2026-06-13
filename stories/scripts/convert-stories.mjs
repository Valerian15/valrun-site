import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const stripMd = (s) => s.replace(/^[*_]+|[*_]+$/g, '').trim()
const deSmart = (s) => s.replace(/[""]/g, '"').replace(/['']/g, "'")
const unquote = (s) => stripMd(s).replace(/^[""]|[""]$/g, '').trim()

// Pure: turn one markitdown dump into structured parts.
export function parseTale(raw) {
  const lines = raw.split('\n').map((l) => l.trimEnd())
  // Epigraph = first italic *"..."* line; its attribution = next non-empty line starting with —
  let epigraph = '', epigraphSource = ''
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\*["“”](.+)["“”]\*$/)
    if (m) {
      epigraph = unquote(m[1])
      const at = lines.slice(i + 1).find((l) => l.trim().startsWith('—'))
      if (at) epigraphSource = at.replace(/^—\s*/, '').trim()
      break
    }
  }
  // Line of record = italic line starting with — near the end
  let lineOfRecord = ''
  const lr = [...lines].reverse().find((l) => /^\*—.*\*$/.test(l))
  if (lr) lineOfRecord = stripMd(lr).replace(/^—\s*/, '').trim()

  // Body = between the SECOND occurrence of the bold title and the line of record,
  // excluding the "Record of Canon" back matter.
  const titleIdxs = lines.map((l, i) => (/^\*\*.+\*\*$/.test(l) ? i : -1)).filter((i) => i >= 0)
  const bodyStart = titleIdxs.length >= 2 ? titleIdxs[1] + 1 : 0
  const recordIdx = lines.findIndex((l) => /Record of Canon/i.test(l))
  const lrIdx = lr ? lines.lastIndexOf(lr) : -1
  const bodyEnd = lrIdx >= 0 ? lrIdx : recordIdx >= 0 ? recordIdx : lines.length
  const body = lines.slice(bodyStart, bodyEnd).join('\n').trim()
  const scenes = body.split(/^❦$/m).map((s) => s.trim()).filter(Boolean)

  return { epigraph: deSmart(epigraph), epigraphSource: deSmart(epigraphSource),
    lineOfRecord: deSmart(lineOfRecord), body, scenes }
}

function wordCount(body) {
  return body.replace(/❦/g, ' ').split(/\s+/).filter(Boolean).length
}

// MDX emitter: scenes joined by the <Break/> component.
function toMdx(meta, parsed) {
  const fm = {
    index: meta.index, title: meta.title, age: meta.age, ageLabel: meta.ageLabel,
    year: meta.year, sortYear: meta.sortYear, regions: meta.regions, places: meta.places,
    engines: meta.engines, teaser: meta.teaser, coverAlt: meta.coverAlt,
    epigraph: parsed.epigraph, epigraphSource: parsed.epigraphSource,
    lineOfRecord: parsed.lineOfRecord, wordCount: wordCount(parsed.body),
  }
  const yaml = Object.entries(fm).map(([k, v]) =>
    Array.isArray(v) ? `${k}:\n${v.map((x) => `  - ${JSON.stringify(x)}`).join('\n')}`
      : `${k}: ${JSON.stringify(v)}`).join('\n')
  const bodyMdx = parsed.scenes
    .map((sc) => sc.split(/\n{2,}/).map((p) => deSmart(p.replace(/\n/g, ' ')).trim()).join('\n\n'))
    .join('\n\n<Break />\n\n')
  return `---\n${yaml}\n---\nimport Break from '../../components/Break.astro'\n\n${bodyMdx}\n`
}

// CLI: read scripts/raw/NN.md -> write src/content/stories/NN-slug.mdx
async function main() {
  const { STORY_META } = await import('./stories.meta.mjs')
  const here = dirname(fileURLToPath(import.meta.url))
  const rawDir = join(here, 'raw')
  const outDir = join(here, '..', 'src', 'content', 'stories')
  for (const meta of STORY_META) {
    const nn = String(meta.index).padStart(2, '0')
    const raw = readFileSync(join(rawDir, `${nn}.md`), 'utf8')
    const parsed = parseTale(raw)
    if (!parsed.epigraph || !parsed.lineOfRecord || parsed.scenes.length === 0)
      throw new Error(`Tale ${nn}: parse incomplete (epigraph/lineOfRecord/scenes)`)
    writeFileSync(join(outDir, `${nn}-${meta.slug}.mdx`), toMdx(meta, parsed))
    console.log(`wrote ${nn}-${meta.slug}.mdx (${wordCount(parsed.body)} words)`)
  }
}

if (process.argv[1] && process.argv[1].endsWith('convert-stories.mjs')) main()
