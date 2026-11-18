import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One Day, Six Stories: the entry is a single image file.
// Copy it unchanged to the directory make.fun asks for.
const root = dirname(fileURLToPath(import.meta.url));
const source = join(root, "entry.png");
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(targetDir, "entry.png");

mkdirSync(targetDir, { recursive: true });
const bytes = readFileSync(source);
writeFileSync(target, bytes);
if (statSync(source).size !== statSync(target).size) {
  throw new Error("entry.png was not copied completely");
}
