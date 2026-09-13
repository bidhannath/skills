import { access, readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../skills/', import.meta.url));
const entries = await readdir(root, { withFileTypes: true });
const errors = [];

for (const entry of entries.filter((item) => item.isDirectory())) {
  const name = entry.name;
  const skillDir = join(root, name);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) errors.push(`${name}: use lowercase kebab-case`);
  const skillPath = join(skillDir, 'SKILL.md');
  try {
    const content = await readFile(skillPath, 'utf8');
    if (!content.startsWith('---\n')) errors.push(`${name}: SKILL.md must start with YAML front matter`);
    if (!/^name:\s*\S+/m.test(content)) errors.push(`${name}: missing front-matter name`);
    if (!/^description:\s*\S+/m.test(content)) errors.push(`${name}: missing front-matter description`);
  } catch {
    errors.push(`${name}: missing SKILL.md`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${entries.filter((entry) => entry.isDirectory()).length} skills.`);
}
