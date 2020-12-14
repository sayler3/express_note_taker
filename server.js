const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/assets', express.static('public'));

require('./routes/apiRoutes')(app);
require('./routes/clientRoutes')(app);

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});