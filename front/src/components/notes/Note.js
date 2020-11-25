import React from 'react';

const Note = ({data, image, name, deleteNote, editNote, id}) => {
  const src = `${process.env.PUBLIC_URL}${image}`;
    return (
		<div className="col mb-4">
		  <div className="card h-100" style={{width: '18em'}}>
			{image && <img src={src} className="card-img-top" alt={image}/>}
			<div className="card-body">
			  <h5 className="card-title">{name}</h5>
			  <p className="card-text">{data}</p>
			</div>
			<div className="card-footer d-flex justify-content-end">
			  <button type="button"
					  className="btn btn-outline-danger align-self-end"
					  onClick={() => deleteNote(id)}>
				Delete
			  </button>
			</div>
		  </div>
		</div>
	)
};


export default Note;
