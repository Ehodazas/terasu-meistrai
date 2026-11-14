/**
 * Iš anksto sugeneruoja kiekvieno puslapio HTML (SSG).
 *
 * Paleidžiama po `vite build` ir `vite build --ssr` (žr. package.json „build“).
 * Kiekvienam maršrutui atvaizduoja React programą į HTML ir įrašo ją į
 * dist/<maršrutas>/index.html vietoje tuščio <div id="root"></div>.
 * Taip turinys matomas ir be JavaScript (paieškos sistemoms, AI įrankiams,
 * nuorodų peržiūroms), o naršyklėje React jį tik „pažadina“ (hydrate).
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

const { render, routes } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)

const EMPTY_ROOT = '<div id="root"></div>'

async function fill(file, path) {
  if (!existsSync(file)) throw new Error(`Nerastas failas: ${file}`)
  const template = readFileSync(file, 'utf8')
  if (!template.includes(EMPTY_ROOT)) throw new Error(`Faile ${file} nerastas ${EMPTY_ROOT}`)
  const html = await render(path)
  writeFileSync(file, template.replace(EMPTY_ROOT, `<div id="root">${html}</div>`))
  return html.length
}

let count = 0
for (const path of routes) {
  const file = path === '/' ? resolve(dist, 'index.html') : resolve(dist, '.' + path, 'index.html')
  const size = await fill(file, path)
  if (size < 2000) throw new Error(`Per mažas HTML maršrutui ${path} (${size} B) – ar puslapis atvaizduotas?`)
  count++
}
// 404 puslapis
await fill(resolve(dist, '404.html'), '/__puslapis-nerastas')

rmSync(ssrDir, { recursive: true, force: true })
console.log(`✓ Iš anksto sugeneruota ${count} puslapių + 404.html`)
