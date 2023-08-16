import React, { useState, useEffect } from 'react';
import './App.css';
import List from './List';

function App() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(null);
  const [mass, setMass] = useState(null);

  useEffect(() => {
    let url = '/data'
    if (year) {
      url += `?year=${year}`
      if (mass) {
        url += `&mass=${mass}`
      }
    } else if (mass) {
      url += `?mass=${mass}`
    }

    console.log(url)
 
    const fetchData = async () => {
      const response = await fetch(
        url
      );
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      setData(body.data);
    };

    fetchData();
  }, [year, mass]);

/*
  useEffect(() => {
      console.log("---yotam---");
      console.log(year);
      console.log("---yotam---");
  })
*/

  return (
    <div className="App">
      <h1> Meteor finder </h1>
      <input className="YearSelector" placeholder="Select Year" onChange={(event)=>{setYear(event.target.value)}} /> 
      <input className="MassSelector" placeholder="Larger Than Mass" onChange={(event)=>{setMass(event.target.value)}} /> 

      <List data={data}/>
    </div>
  );
}

export default App;