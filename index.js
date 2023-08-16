const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

const fs = require('fs');
let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata);
data = data.map((item) => ({
        ...item,
        year: new Date(item.year).toLocaleDateString('en-us', { year:"numeric"}),
        mass: item.mass ?? 'Unknown' 
      }));

app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/data', (req, res) => {
  const year = req.query.year;
  const mass = parseInt(req.query.mass);
  let filteredData = data; 
 
 console.log(filteredData[0])

  if (year) {
    filteredData = filteredData.filter((item) => item.year == year);
  }

  if (mass) {
    filteredData = filteredData.filter((item) => item.mass > mass);
  }

  console.log(mass);
  console.log(filteredData.length);


  res.send({ data: filteredData });
});