import fs from "node:fs";
import path from "node:path";

const project_root = process.cwd();
const dist_dir = path.join(project_root, "dist");
const html_files = ["index.html", "it/index.html", "en/index.html", "de/index.html"];

const allowed_external_prefixes = [
    "https://wa.me/",
    "https://t.me/",
    "https://www.airbnb.com/",
    "https://www.airbnb.it/",
    "https://www.booking.com/",
    "https://www.subito.it/",
    "https://www.idealista.it/",
    "https://maps.app.goo.gl/",
    "https://maps.google.com/",
    "https://casa-nel-verde.it/",
];

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

for (const html_file of html_files) {
    const href_pattern = /href="([^"]+)"/g;
    const absolute_path = path.join(dist_dir, html_file);
    const content = fs.readFileSync(absolute_path, "utf-8");

    let match;
    while ((match = href_pattern.exec(content)) !== null) {
        const href = match[1];
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
            continue;
        }

        if (href.startsWith("http://") || href.startsWith("https://")) {
            assert(
                allowed_external_prefixes.some((prefix) => href.startsWith(prefix)),
                `Unexpected external link in ${html_file}: ${href}`,
            );
            continue;
        }

        if (href.startsWith("/")) {
            const target_file = href.endsWith("/") ? `${href}index.html` : href;
            const normalized = target_file.replace(/^\//, "");
            const target_path = path.join(dist_dir, normalized);
            assert(fs.existsSync(target_path), `Broken internal link in ${html_file}: ${href}`);
        }
    }
}

console.log("Link checks passed for generated pages.");
