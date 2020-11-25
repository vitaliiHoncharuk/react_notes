import React from 'react';
import Note from './Note.js';

const CardList = ({notes, loading, deleteNote}) => {

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
	  <div className="container mt-2">
		<div className="row row-cols-1 row-cols-md-3 ml2">
		  {notes.map(({image, data, name, _id}) =>
			  (<Note key={_id} name={name} data={data} image={image} id={_id} deleteNote={deleteNote}/>))}
		</div>
	  </div>
  )
};

export default CardList;
