import fs from "node:fs";
import path from "node:path";

const project_root = process.cwd();
const dist_dir = path.join(project_root, "dist");

const expectations = [
    {
        file: "it/index.html",
        snippets: ["Casa Nel Verde", "WhatsApp", "Telegram", "Dove trovarci online"],
    },
    {
        file: "en/index.html",
        snippets: ["Casa Nel Verde", "WhatsApp", "Telegram", "Find us online"],
    },
    {
        file: "de/index.html",
        snippets: ["Casa Nel Verde", "WhatsApp", "Telegram", "Online finden"],
    },
];

for (const expectation of expectations) {
    const absolute_path = path.join(dist_dir, expectation.file);
    const content = fs.readFileSync(absolute_path, "utf-8");

    for (const snippet of expectation.snippets) {
        if (!content.includes(snippet)) {
            throw new Error(`Smoke test failed for ${expectation.file}. Missing snippet: ${snippet}`);
        }
    }
}

console.log("Smoke tests passed for language pages.");
