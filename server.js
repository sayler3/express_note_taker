const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/apiRoutes')(app);

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});