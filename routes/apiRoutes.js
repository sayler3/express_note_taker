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

    app.post('/api', (req, res) => {
        console.log(req.body);
        fs.readFile(noteData, 'utf8', (err, data) => {
            if (err) throw err;

            const newRes = JSON.parse(data);

            newRes.push({
                title: req.body.title,
                text: req.body.text,
            });

            fs.writeFile(noteData, JSON.stringify(newRes), (err) => {
                if (err) throw err;
                res.json({ msg: 'succefully added'});
            });
        });
    });
}