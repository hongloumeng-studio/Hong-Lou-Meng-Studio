// This is a Nodejs program, when executed will back up and refresh the "versionChapterMenu.json"
// according to each [version]/[chapter json file] stored in the "/versions" folder

const now = new Date();
const fs = require('fs');
const path = require('path');
const folder_path = path.join(__dirname, '../versions');
const menuFile = path.join(__dirname, '../js/versionChapterMenu.json');
const versions = fs.readdirSync(folder_path).filter(f => fs.statSync(path.join(folder_path, f)).isDirectory());
let dict = "{";
console.log(versions);
for (let version of versions) {
    const files = fs.readdirSync(path.join(folder_path, version));
    let chapter_list = "";
    for (let f of files) {
        const sourceFile = path.join(folder_path, version, f);
        const j = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
        chapter_list +=  `{"id": ${j["id"]}, "title": "${j["title"]["text"]}"},\n`;
    }
    chapter_list = chapter_list.slice(0, -2);
    // console.log(chapter_list);
    dict += `"${version}" : [\n${chapter_list}\n],\n`;
}
dict = dict.slice(0, -2);
dict += "\n}";
// console.log(dict);

// Rename the existing versionChapterMenu.json
if (fs.existsSync(menuFile)) {
    const timestamp = now.toISOString().slice(0, -8).replace(/:/g, "-");
    console.log("Current time:", timestamp);
    fs.renameSync(menuFile, menuFile.replace(".json", timestamp+".json"));
}
// Create the new menu file
fs.writeFileSync(menuFile, dict, 'utf8');
console.log("New menu file has been created: "+ menuFile);