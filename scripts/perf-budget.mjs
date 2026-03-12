import fs from "node:fs";
import path from "node:path";

const project_root = process.cwd();
const dist_dir = path.join(project_root, "dist");
const assets_dir = path.join(dist_dir, "_astro");

const js_budget_bytes = 220 * 1024;
const css_budget_bytes = 80 * 1024;

function collect_files(dir_path, extension) {
    if (!fs.existsSync(dir_path)) {
        return [];
    }

    return fs
        .readdirSync(dir_path)
        .filter((file_name) => file_name.endsWith(extension))
        .map((file_name) => path.join(dir_path, file_name));
}

function total_size(file_paths) {
    return file_paths.reduce((total, file_path) => total + fs.statSync(file_path).size, 0);
}

const js_files = collect_files(assets_dir, ".js");
const css_files = collect_files(assets_dir, ".css");

const js_size = total_size(js_files);
const css_size = total_size(css_files);

if (js_size > js_budget_bytes) {
    throw new Error(`JS budget exceeded: ${js_size} bytes > ${js_budget_bytes} bytes`);
}

if (css_size > css_budget_bytes) {
    throw new Error(`CSS budget exceeded: ${css_size} bytes > ${css_budget_bytes} bytes`);
}

console.log(`Performance budget passed. JS=${js_size} bytes, CSS=${css_size} bytes.`);
