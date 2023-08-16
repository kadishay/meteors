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
  let filteredData = findData(year, mass);

  //if no data found for mass in year, return another year and info message
  if (!filteredData.length && mass) {
    const newYear = findYear(mass);
    //might not have any year found
    if (newYear) {
      filteredData = findData(newYear, mass);
      res.send({ data: filteredData, yearUpdate: newYear, error: 302, message: `No meteors over required mass (${mass}) found on year ${year}, thus year modified to ${newYear}` });
    } else {
      res.send({ data: filteredData, error: 404, message: `No meteors over required mass (${mass}) found` });
    }
  } else {
    console.log(filteredData);
    res.send({ data: filteredData });
  }
});

function findData(year,mass) {
  let filteredData = data; 
 
  if (year) {
    filteredData = filteredData.filter((item) => item.year == year);
  }

  if (mass) {
    filteredData = filteredData.filter((item) => item.mass > mass);
  }

  return filteredData;
}

function findYear(mass) {
  let applicableItem = data.find((item) => item.mass > mass);
  return applicableItem ? applicableItem.year : null; 
}