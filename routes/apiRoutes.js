const path = require("path");
const noteData = path.join(__dirname, "../db/db.json");
const fs = require("fs");
const { nanoid } = require("nanoid");

module.exports = (app) => {
	app.get("/api/notes", (req, res) => {
		console.log("This was hit");
		fs.readFile(noteData, "utf8", (err, data) => {
			if (err) throw err;
			res.json(JSON.parse(data));
		});
	});

	app.post("/api/notes", (req, res) => {
		console.log(req.body);
		fs.readFile(noteData, "utf8", (err, data) => {
			if (err) throw err;

			const newRes = JSON.parse(data);

			let noteID = req.body.id;
			noteID = nanoid(10);

			newRes.push({
				title: req.body.title,
				text: req.body.text,
				id: noteID,
			});

			fs.writeFile(noteData, JSON.stringify(newRes), (err) => {
				if (err) throw err;
				res.json({ msg: "succefully added" });
			});
		});
	});

	app.delete("/api/notes/:id", (req, res) => {
		// console.log(req.body);
		const search = req.params.id;

		fs.readFile(noteData, "utf8", (err, data) => {
			if (err) throw err;
			const allNotes = JSON.parse(data);
			for (let i = 0; i < allNotes.length; i++) {
				if (allNotes[i].id === search) {
					allNotes.splice(i, 1);
					fs.writeFile(noteData, JSON.stringify(allNotes), (err) => {
						if (err) throw err;
						res.json({ msg: "note deleted" });
					});
				}
			}
		});
	});
};
