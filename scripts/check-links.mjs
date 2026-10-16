import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else if (file.endsWith('.html')) results.push(full);
  }
  return results;
}

const distDir = './dist';
if (!fs.existsSync(distDir)) {
  console.error("Error: ./dist does not exist. Please run 'npm run build' first.");
  process.exit(1);
}

const htmlFiles = walk(distDir);
console.log(`[check-links] Scanning ${htmlFiles.length} HTML files in ./dist...`);

// Index valid static routes
const validRoutes = new Set();
function indexStaticRoutes(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      indexStaticRoutes(full);
    } else {
      let route = full.replace(/^dist/, '');
      if (!route.startsWith('/')) route = '/' + route;
      validRoutes.add(route);
      if (route.endsWith('/index.html')) {
        const clean = route.replace(/index\.html$/, '');
        validRoutes.add(clean);
        if (clean.endsWith('/') && clean.length > 1) {
          validRoutes.add(clean.slice(0, -1));
        }
      }
    }
  }
}
indexStaticRoutes(distDir);

const internalLinksMap = new Map();
const externalLinksMap = new Map();
const brokenInternal = [];

const linkRegex = /href=["']([^"'#]+)(?:#[^"']*)?["']/gi;

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, 'utf-8');
  const relFile = htmlFile.replace(/^dist/, '');
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    let href = match[1].trim();
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }

    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!externalLinksMap.has(href)) externalLinksMap.set(href, new Set());
      externalLinksMap.get(href).add(relFile);
    } else if (href.startsWith('/')) {
      if (!internalLinksMap.has(href)) internalLinksMap.set(href, new Set());
      internalLinksMap.get(href).add(relFile);

      const clean = href.split('?')[0];
      if (!validRoutes.has(clean) && !validRoutes.has(clean + '/')) {
        brokenInternal.push({ source: relFile, target: href });
      }
    }
  }
}

console.log(`[check-links] Internal links: ${internalLinksMap.size} checked (${brokenInternal.length} broken)`);
console.log(`[check-links] External links: ${externalLinksMap.size} unique URLs found`);

const externalEntries = Array.from(externalLinksMap.entries());
const externalResults = [];

async function testExternalUrl(url, sources) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      signal: AbortSignal.timeout(10000),
      redirect: 'follow'
    });
    return {
      url,
      status: res.status,
      ok: res.ok,
      redirected: res.redirected,
      finalUrl: res.url,
      sources: Array.from(sources).slice(0, 3)
    };
  } catch (err) {
    return {
      url,
      status: 0,
      ok: false,
      error: err.message,
      sources: Array.from(sources).slice(0, 3)
    };
  }
}

// Batch test external links with courteous concurrency
const batchSize = 8;
for (let i = 0; i < externalEntries.length; i += batchSize) {
  const batch = externalEntries.slice(i, i + batchSize);
  const res = await Promise.all(batch.map(([u, s]) => testExternalUrl(u, s)));
  externalResults.push(...res);
  process.stdout.write(`[check-links] Checked ${externalResults.length}/${externalEntries.length} external URLs...\r`);
}
console.log('');

const brokenExternal = externalResults.filter(r => !r.ok);
const redirectedExternal = externalResults.filter(r => r.redirected && r.url !== r.finalUrl);

// Write LINK_REPORT.md
const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

let reportContent = `# Link Verification Report

**Generated:** ${timestamp}  
**Total Pages Crawled:** ${htmlFiles.length}  
**Internal Links Checked:** ${internalLinksMap.size} (Broken: ${brokenInternal.length})  
**External Links Checked:** ${externalResults.length} (Broken/Failed: ${brokenExternal.length}, Redirected: ${redirectedExternal.length})

---

## 1. Internal Links
`;

if (brokenInternal.length === 0) {
  reportContent += `\n✓ **All internal links are valid and resolving correctly.**\n`;
} else {
  reportContent += `\n| Source Page | Target Link |\n| :--- | :--- |\n`;
  brokenInternal.forEach(b => {
    reportContent += `| \`${b.source}\` | \`${b.target}\` |\n`;
  });
}

reportContent += `\n---

## 2. External Links Summary

- **Working (HTTP 200–299):** ${externalResults.length - brokenExternal.length}
- **Broken / Error (4xx, 5xx, or Timeout):** ${brokenExternal.length}
- **Redirected:** ${redirectedExternal.length}

`;

if (brokenExternal.length > 0) {
  reportContent += `### Broken External Links\n\n| Status | URL | Error | Sources |\n| :---: | :--- | :--- | :--- |\n`;
  brokenExternal.forEach(b => {
    reportContent += `| ${b.status || 'ERR'} | \`${b.url}\` | ${b.error || ''} | ${b.sources.map(s => '`' + s + '`').join(', ')} |\n`;
  });
}

if (redirectedExternal.length > 0) {
  reportContent += `\n### Redirected External Links\n\n| Original URL | Final Destination | Sources |\n| :--- | :--- | :--- |\n`;
  redirectedExternal.forEach(r => {
    reportContent += `| \`${r.url}\` | \`${r.finalUrl}\` | ${r.sources.map(s => '`' + s + '`').join(', ')} |\n`;
  });
}

fs.writeFileSync('./LINK_REPORT.md', reportContent, 'utf-8');
console.log(`[check-links] Report successfully written to LINK_REPORT.md`);
