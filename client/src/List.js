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
			{data.map((item) => <div className="ListItem" key={item.id}>
						<div>{item.name}</div>
						<div>{item.recclass}</div>
						<div>{item.year}</div>
						<div>{item.mass}</div>
				</div>)}
			{!data.length ? <div className="ListItem" key="empty">Nothing to see here buddy!</div> : ""}
		</div>
  	)
}

export default List;