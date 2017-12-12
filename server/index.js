const express = require('express');
const app = express();
const path = require('path');

app.use('/app.js', express.static(path.join(__dirname, '../lib/app.js')));
app.use('/*/app.js', express.static(path.join(__dirname, '../lib/app.js')));
app.use('/app.js.map', express.static(path.join(__dirname, '../lib/app.js.map')));
app.use('/*/app.js.map', express.static(path.join(__dirname, '../lib/app.js.map')));
app.use(express.static(path.join(__dirname, '../example')));

app.use('/*', express.static(path.join(__dirname, '../example/index.html')));

app.listen(3001, () => console.log('Example app listening on port 3001!'));