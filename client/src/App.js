import React, { useState, useEffect } from 'react';
import './App.css';
import List from './List';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(undefined);
  const [mass, setMass] = useState(null);
  const [error, setError] = useState(false);
  const [paginationAvailable, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  function generateURL(year, mass) {
    let url = `/data?page=${page}`
    if (year) {
      url += `&year=${year}`
    } 
    if (mass) {
      url += `&mass=${mass}`
    }
    return url;
  }

  function getlength(number) {
    return number ? number.toString().length : 0;
  }

  useEffect(() => {
    //avoid partial year
    let yearInputLength = getlength(year);
    if( yearInputLength > 0 && yearInputLength < 4){
      return;
    }

    let url = generateURL(year, mass)
    setError(false);
 
    const fetchData = async () => {
      const response = await fetch(
        url
      );
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      setData(body.data);
      
      //handle edge cases
      if (body.error === 302) {
        setYear(body.yearUpdate);
        toast.error(body.message);
      } else if (body.error === 404) {
        toast.error(body.message);
        setError(true);
      }

      //handle pagination
      setPagination(body.hasMore);
    };

    fetchData();
  }, [year, mass, page]);

  return (
    <div className="App">
      <h1> Meteor finder </h1>
      <input className="YearSelector" placeholder="Select Year" onChange={(event)=>{setYear(event.target.value)}} value={year} /> 
      <input className="MassSelector" placeholder="Larger Than Mass" onChange={(event)=>{setMass(event.target.value)}} /> 
      <List className="YearSelector" data={data} error={error}/>
      <Toaster position="bottom-right"/>
      <button 
        className="Pagination" 
        disabled={page===1 ? true : false}
        onClick={() => setPage(page - 1)}> Back</button>
      <button 
        className="Pagination" 
        disabled={paginationAvailable ? false : true}
        onClick={() => setPage(page + 1)}> Next</button>
    </div>
  );
}

export default App;