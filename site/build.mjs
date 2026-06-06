// Build script: converts the Markdown chapters and KQL queries into a single
// static index.html with tab navigation. Output goes to dist/.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { marked } from 'marked';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO_URL = 'https://github.com/security-commons-nl/Handelingsperspectief';

/** Tab manifest: source file, stable section id and short tab label. */
const TABS = [
  { file: 'README.md', id: 'start', label: 'Start' },
  { file: '00-managementsamenvatting.md', id: '00-managementsamenvatting', label: '00 · Samenvatting' },
  { file: '01-methode-evidence-based.md', id: '01-methode-evidence-based', label: '01 · Methode' },
  { file: '02-werkplek-analyse-e5.md', id: '02-werkplek-analyse-e5', label: '02 · Werkplek (E5)' },
  { file: '03-identiteit-en-email.md', id: '03-identiteit-en-email', label: '03 · Identiteit & e-mail' },
  { file: '04-netwerk-firewall-config-analyse.md', id: '04-netwerk-firewall-config-analyse', label: '04 · Netwerk & firewall' },
  { file: '05-killchain-chokepoints.md', id: '05-killchain-chokepoints', label: '05 · Killchain' },
  { file: '06-regie-en-accountability.md', id: '06-regie-en-accountability', label: '06 · Regie' },
  { file: '07-veilig-faciliteren.md', id: '07-veilig-faciliteren', label: '07 · Veilig faciliteren' },
];

const QUERY_FILES = [
  'clickfix-detectie.kql',
  'winr-runmru-top.kql',
  'winr-categorisatie.kql',
  'powershell-totaal-categorisatie.kql',
  'powershell-interactief.kql',
  'mshta-gebruik.kql',
];

/**
 * Escapes HTML special characters in raw text.
 * @param {string} text Raw text.
 * @returns {string} HTML-safe text.
 */
function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * Rewrites relative repo links in rendered HTML to in-page tab anchors.
 * @param {string} html Rendered chapter HTML.
 * @returns {string} HTML with rewritten hrefs.
 */
function rewriteLinks(html) {
  return html
    .replace(/href="(\d{2}-[a-z0-9-]+)\.md"/g, 'href="#$1"')
    .replace(/href="queries\/[^"]*"/g, 'href="#queries"')
    .replace(/href="LICENSE"/g, `href="${REPO_URL}/blob/main/LICENSE"`);
}

/**
 * Extracts the "Doel:" sentence from a KQL file's leading comment block.
 * @param {string} source Raw KQL file content.
 * @returns {string} Short purpose description, or an empty string.
 */
function queryPurpose(source) {
  const header = [];
  for (const line of source.split('\n')) {
    if (!line.startsWith('//')) break;
    header.push(line.replace(/^\/\/\s?/, '').trim());
  }
  const text = header.join(' ');
  const match = text.match(/Doel:\s*(.*?)\s*(?:Vereist:|Bewuste beperkingen|$)/);
  return match ? match[1].trim() : '';
}

/**
 * Builds the HTML for the queries tab: one code block per KQL file.
 * @returns {string} Section inner HTML.
 */
function buildQueriesSection() {
  const blocks = QUERY_FILES.map((name) => {
    const source = readFileSync(join(ROOT, 'queries', name), 'utf8').trimEnd();
    const purpose = queryPurpose(source);
    return [
      `<article class="query">`,
      `<h2><code>${escapeHtml(name)}</code></h2>`,
      purpose ? `<p class="query-doel">${escapeHtml(purpose)}</p>` : '',
      `<div class="codewrap"><button class="copy" type="button" data-copy>Kopieer</button>`,
      `<pre><code>${escapeHtml(source)}</code></pre></div>`,
      `</article>`,
    ].join('\n');
  });
  return [
    `<h1>Herbruikbare KQL-query's</h1>`,
    `<p>Voor Microsoft Defender Advanced Hunting. Pas parent-processen en uitsluitingen aan op je eigen omgeving;`,
    ` de toelichting staat in de commentaarregels van elke query.</p>`,
    ...blocks,
  ].join('\n');
}

/**
 * Renders one Markdown tab to a section element.
 * @param {{file: string, id: string, label: string}} tab Tab manifest entry.
 * @returns {string} Section HTML.
 */
function buildMarkdownSection(tab) {
  const markdown = readFileSync(join(ROOT, tab.file), 'utf8');
  const html = rewriteLinks(marked.parse(markdown, { gfm: true }));
  return `<section id="${tab.id}" class="tab-panel" aria-label="${escapeHtml(tab.label)}">\n${html}\n</section>`;
}

/**
 * Assembles the complete index.html document.
 * @returns {string} Full HTML document.
 */
function buildPage() {
  const css = readFileSync(join(ROOT, 'site', 'page.css'), 'utf8');
  const js = readFileSync(join(ROOT, 'site', 'page.js'), 'utf8');
  const allTabs = [...TABS, { id: 'queries', label: "Query's" }];
  const nav = allTabs
    .map((t) => `<button type="button" class="tab" data-target="${t.id}">${escapeHtml(t.label)}</button>`)
    .join('\n');
  const sections = [
    ...TABS.map(buildMarkdownSection),
    `<section id="queries" class="tab-panel" aria-label="Query's">\n${buildQueriesSection()}\n</section>`,
  ].join('\n');
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Handelingsperspectief security posture voor gemeenten</title>
<meta name="description" content="Evidence-based methode om als gemeente de security posture te verhogen, met ClickFix als casus.">
<style>
${css}
</style>
</head>
<body>
<header class="site-header">
  <div class="inner">
    <p class="site-kicker">Security Commons NL</p>
    <p class="site-title">Handelingsperspectief security posture voor gemeenten</p>
  </div>
  <nav class="tabs inner" aria-label="Hoofdstukken">
${nav}
  </nav>
</header>
<main class="inner">
${sections}
</main>
<footer class="inner">
  <p>Licentie: <a href="${REPO_URL}/blob/main/LICENSE">EUPL-1.2</a> ·
     Bron en wijzigingsgeschiedenis: <a href="${REPO_URL}">GitHub</a></p>
</footer>
<script>
${js}
</script>
</body>
</html>
`;
}

mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(join(ROOT, 'dist', 'index.html'), buildPage());
writeFileSync(join(ROOT, 'dist', '.nojekyll'), '');
console.log('Wrote dist/index.html');
