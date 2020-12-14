const path = require('path');
const noteData = path.join(__dirname, "../db/db.json");
const fs = require("fs");

module.exports = (app) => {
    app.get('/api', (req, res) => {
        console.log("This was hit");
        fs.readFile(noteData, 'utf8', (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        })
    });
}