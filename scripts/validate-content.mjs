import fs from "node:fs";
import path from "node:path";

const project_root = process.cwd();
const locales_dir = path.join(project_root, "src", "content", "locales");
const required_locales = ["it", "en", "de"];

function flatten_keys(value, prefix = "", keys = new Set()) {
    if (Array.isArray(value)) {
        value.forEach((item, index) => {
            flatten_keys(item, `${prefix}[${index}]`, keys);
        });
        return keys;
    }

    if (value !== null && typeof value === "object") {
        Object.entries(value).forEach(([key, nested]) => {
            const next_prefix = prefix ? `${prefix}.${key}` : key;
            keys.add(next_prefix);
            flatten_keys(nested, next_prefix, keys);
        });
    }

    return keys;
}

const locale_maps = required_locales.map((locale) => {
    const file_path = path.join(locales_dir, `${locale}.json`);
    const content = JSON.parse(fs.readFileSync(file_path, "utf-8"));
    return { locale, keys: flatten_keys(content) };
});

const base = locale_maps[0];
let has_errors = false;

for (const current of locale_maps.slice(1)) {
    for (const key of base.keys) {
        if (!current.keys.has(key)) {
            has_errors = true;
            console.error(`Missing key in ${current.locale}.json: ${key}`);
        }
    }

    for (const key of current.keys) {
        if (!base.keys.has(key)) {
            has_errors = true;
            console.error(`Extra key in ${current.locale}.json: ${key}`);
        }
    }
}

if (has_errors) {
    process.exit(1);
}

console.log(`Content validation passed for locales: ${required_locales.join(", ")}`);
