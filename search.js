const fs = require('fs');
const path = require('path');

export function searchFiles(directory, query, callback) {
    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) {
            return callback(err);
        }

        let results = [];
        files.forEach(file => {
            if (file.isDirectory()) {
                searchFiles(path.join(directory, file.name), query, (err, subResults) => {
                    if (subResults) {
                        results = results.concat(subResults);
                        callback(null, results);
                    }
                });
            } else if (file.name.toLowerCase().includes(query.toLowerCase())) {
                results.push(path.join(directory, file.name));
            }
        });

        callback(null, results);
    });
}

// module.exports = { searchFiles };
