import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const skillsRoot = join(repoRoot, 'skills');
const home = process.env.HOME ?? process.env.USERPROFILE ?? '.';
const args = process.argv.slice(2);
const targetArg = args.find((arg) => arg.startsWith('--target='));
const destArg = args.find((arg) => arg.startsWith('--dest='));
const target = targetArg ? targetArg.slice('--target='.length) : 'claude';
const defaultDestinations = {
  claude: join(home, '.claude', 'skills'),
  codex: join(home, '.codex', 'skills'),
  opencode: join(home, '.config', 'opencode', 'skills'),
};

if (!defaultDestinations[target]) {
  console.error(`Unknown target: ${target}. Use claude, codex, or opencode.`);
  process.exit(1);
}

const destination = resolve(destArg ? destArg.slice('--dest='.length) : defaultDestinations[target]);
const entries = await readdir(skillsRoot, { withFileTypes: true });
const skills = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();

for (const name of skills) {
  const source = join(skillsRoot, name);
  const output = join(destination, name);
  await mkdir(output, { recursive: true });
  const children = await readdir(source, { withFileTypes: true });

  for (const child of children) {
    if (target !== 'codex' && child.name === 'agents') continue;
    const from = join(source, child.name);
    const to = join(output, child.name);
    if (child.name === 'SKILL.md' && target !== 'claude') {
      const content = await readFile(from, 'utf8');
      const transformed = content.replace(
        /^(---\n[\s\S]*?)(^disable-model-invocation:\s*[^\n]+\n)([\s\S]*?\n---\n)/m,
        '$1$3',
      );
      await writeFile(to, transformed);
    } else {
      await cp(from, to, { recursive: true, force: true });
    }
  }
  console.log(`installed ${name} -> ${output}`);
}

console.log(`Installed ${skills.length} skills for ${target}.`);
