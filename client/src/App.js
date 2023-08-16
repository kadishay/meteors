import React, { useState, useEffect } from 'react';
import './App.css';
import List from './List';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(null);
  const [mass, setMass] = useState(null);

  function generateURL(year, mass) {
    let url = '/data'
    if (year) {
      url += `?year=${year}`
      if (mass) {
        url += `&mass=${mass}`
      }
    } else if (mass) {
      url += `?mass=${mass}`
    }
    return url;
  }

  useEffect(() => {
    let url = generateURL(year, mass)
 
    const fetchData = async () => {
      const response = await fetch(
        url
      );
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      setData(body.data);
      if (body.error === 302) {
        setYear(body.yearUpdate);
        toast.error(body.message);
      } else if (body.error === 404) {
        toast.error(body.message);
      }
    };

    fetchData();
  }, [year, mass]);

  return (
    <div className="App">
      <h1> Meteor finder </h1>
      <input className="YearSelector" placeholder="Select Year" onChange={(event)=>{setYear(event.target.value)}} value={year} /> 
      <input className="MassSelector" placeholder="Larger Than Mass" onChange={(event)=>{setMass(event.target.value)}} /> 
      <List className="YearSelector" data={data}/>
      <Toaster position="bottom-right"/>
    </div>
  );
}

export default App;