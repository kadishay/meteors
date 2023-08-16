const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

const fs = require('fs');
let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata);

app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/data', (req, res) => { //Line 9
  res.send({ data: data });
});