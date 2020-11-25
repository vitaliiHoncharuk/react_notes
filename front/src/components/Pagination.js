import React, {Component} from 'react';

class Pagination extends Component {

  render() {
    const { notesPerPage, totalNotes, paginate, nextPage, prevPage } = this.props;
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
      pageNumbers.push(i);
	}

	return (
		<div className="container mt-1">
		  <nav>
			<ul className="pagination justify-content-center">
			  <li className="page-item">
				<button className="page-link" onClick={() => prevPage()}>Previous</button>
			  </li>
			  {pageNumbers.map(num => (
			  	<li className="page-item" key={num}>
				  <button onClick={() => paginate(num)} className="page-link">{num}</button>
			  	</li>
			  ))}
			  <li className="page-item">
				<button className="page-link" onClick={() => nextPage()}>Next</button>
			  </li>
			</ul>
		  </nav>
		</div>
	);
  }
}

export default Pagination;
