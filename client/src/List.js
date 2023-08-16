import React, { useState, useEffect } from 'react';
import './List.css';

function List(props) {
  	const [data, setData] = useState([])

	useEffect(() => {
	    setData(props.data)
 	})

  	return (
		<div className="List">
			{data.map((item) => <li key={item.name}>{item.name}</li>)}
		</div>
  	)
}

export default List;