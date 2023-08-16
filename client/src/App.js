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

  function generateURL() {
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

  const fetchData = async () => {
      //avoid fetch pagination when none availble
      if (page !== 1 && !paginationAvailable) {
        return;
      }

      let url = generateURL()
      const response = await fetch(
        url, { cache: "force-cache" }
      );
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      //handle pagination
      if(page===1) {
        setData(body.data);
      } else {
        setData(data.concat(body.data));
      }
       
      //handle edge cases
      if (body.error === 302) {
        setPage(1);
        setYear(body.yearUpdate);
        toast.error(body.message);
      } else if (body.error === 404) {
        toast.error(body.message);
        setError(true);
      }

      //handle pagination
      setPagination(body.hasMore);
    };

  useEffect(() => {
    //avoid partial year
    let yearInputLength = getlength(year);
    if( yearInputLength > 0 && yearInputLength < 4){
      return;
    }

    setError(false);

    fetchData();
  }, [year, mass, page]);

  function scrollHandler(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      // you're at the bottom of the page
      setPage(page+1);
    }
  }

  useEffect(() => {
    document.removeEventListener("scrollend", scrollHandler);
    document.addEventListener("scrollend", scrollHandler);
  }, [page]);

  return (
    <div className="App">
      <h1> Meteor finder </h1>
      <input 
      className="YearSelector" 
      placeholder="Select Year" 
      onChange={(event)=>{setPage(1);setYear(event.target.value)}} 
      onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
          toast.error("Numbers only...");
        }
      }}
      value={year} /> 
      <input 
        className="MassSelector" 
        placeholder="Larger Than Mass" 
        onChange={(event)=>{setPage(1);setMass(event.target.value)}}
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
            toast.error("Numbers only...");
          }
        }} /> 
      <List className="YearSelector" data={data} error={error}/>
      <Toaster position="bottom-right"/>
    </div>
  );
}

export default App;