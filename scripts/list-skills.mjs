import { readdir } from 'node:fs/promises';

const root = new URL('../skills/', import.meta.url);
const entries = await readdir(root, { withFileTypes: true });
const skills = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();

for (const skill of skills) console.log(skill);
