import { test, expect } from 'vitest'
import { parseTale } from './convert-stories.mjs'

const RAW = `**The Last Census of Zelkarun**

*A Tale of Val'Run*

Third Age · Year 0 – 5 AI

Story 01 · Version 1.2

*"We counted what we could not keep."*

— the first of the Three Bound Volumes, Ash Archive of the Black Bastion

**The Last Census of Zelkarun**

The forty-first name on the census roll was a child of six.

❦

The keeper of records had no name the harbour could pronounce.

❦

*— set down at the Black Bastion in the fifth year after the Impact.*

**Record of Canon**

| | |
| --- | --- |
| **Age / Year** | Third Age |`

test('parseTale extracts epigraph, source, body scenes, line of record; drops front/back matter', () => {
  const t = parseTale(RAW)
  expect(t.epigraph).toBe('We counted what we could not keep.')
  expect(t.epigraphSource).toBe('the first of the Three Bound Volumes, Ash Archive of the Black Bastion')
  expect(t.lineOfRecord).toBe('set down at the Black Bastion in the fifth year after the Impact.')
  expect(t.scenes.length).toBe(2)
  expect(t.scenes[0]).toContain('forty-first name')
  expect(t.body).not.toContain('Record of Canon')
  expect(t.body).not.toContain('A Tale of Val')
})
