import React, { useState, useEffect } from 'react';
import './App.css';
import List from './List';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        '/data',
      );
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      setData(body.data);
    };

    fetchData();
  }, []);

/*
  useEffect(() => {
      console.log("---yotam---");
      console.log(data);
      console.log("---yotam---");
  })
*/
  
  return (
    <div>
      <List data={data}/>
    </div>
  );
}

export default App;