const fs = require('fs');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        // skip node_modules and .git
        if (file === 'node_modules' || file === '.git' || file === '.next') continue;
        const path = dir + '/' + file;
        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
            walk(path);
        } else {
            if (path.includes('file:') || path.includes('連假計劃書-1') || path.includes('企劃') || path.includes('.mp4') || path.includes('.pdf') || path.includes('-1')) {
                console.log(path, stat.size);
            }
        }
    }
}
walk('.');
