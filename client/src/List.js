import React, { useState, useEffect } from 'react';
import './List.css';

function List(props) {
  	const [data, setData] = useState([])

  	//Slightly innefficiance and repetative

	useEffect(() => {
	    setData(props.data)
 	}, [props.data])

  	return (
		<div className="List">
			{data.map((item) => <div key={item.id}>
						{item.name} - {item.recclass} - {item.year} - {item.mass}
				</div>)}
		</div>
  	)
}

export default List;