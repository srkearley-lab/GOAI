import { icons } from 'lucide-react';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ALIASES = {
  Home: 'House', BarChart3: 'ChartColumn', Layout: 'PanelsTopLeft', LineChart: 'ChartLine',
  AlertCircle: 'CircleAlert', CheckCircle: 'CircleCheck', CheckCircle2: 'CircleCheckBig',
};

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx)$/.test(e)) out.push(p);
  }
  return out;
}

const files = ['lib/catalog.ts', 'data/content.ts', ...walk('components'), ...walk('app')];
const names = new Set();
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  // data: icon: 'X'
  for (const m of src.matchAll(/\bicon:\s*'([A-Za-z0-9]+)'/g)) names.add(m[1]);
  // JSX: name="X" | name='X' | name={ ... 'X' ... }  (captures both ternary branches)
  for (const m of src.matchAll(/\bname=(?:"([A-Za-z0-9]+)"|'([A-Za-z0-9]+)'|\{[^}]*\})/g)) {
    if (m[1]) names.add(m[1]);
    if (m[2]) names.add(m[2]);
    if (m[0].startsWith('name={')) for (const q of m[0].matchAll(/['"]([A-Za-z0-9]+)['"]/g)) names.add(q[1]);
  }
}
['Layout', 'LayoutTemplate', 'Bot', 'ShieldCheck'].forEach((n) => names.add(n));

const avail = new Set(Object.keys(icons));
const missing = [...names].filter((n) => !avail.has(ALIASES[n] || n)).sort();
console.log(`Distinct icon names referenced: ${names.size}`);
console.log(missing.length ? `MISSING (${missing.length}): ${missing.join(', ')}` : 'ALL ICON NAMES RESOLVE ✓');
process.exit(missing.length ? 1 : 0);
