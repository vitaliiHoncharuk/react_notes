import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';
import NoteList from './notes/NoteList';
import CreateNote from './notes/CreateNote';
import { Route } from 'react-router-dom';
import Pagination from './Pagination';
import API from '../api';
import ErrorBoundry from './ErrorBoundry';

class App extends Component {
  state = {
    notes: [],
	loading: false,
	currentPage: 1,
	notesPerPage: 5
  };

  componentDidMount() {
    const getNotes = async () => {
      this.setState({loading: true});
      const results = await API.get('/');
      this.setState({notes: results.data});
      this.setState({loading: false});
	};
	getNotes();
  }


  deleteNote = async (id) => {
	const updatedNotes = this.state.notes.filter(({_id}) => _id !== id );
    this.setState({notes: updatedNotes});
    this.setState({loading: true});
    const result = await API.delete(`/${id}`);
	console.log(result);
	this.setState({loading: false});

  };

  render() {
	const {currentPage, notesPerPage, notes, loading } = this.state;
	const indexOfLastNote = currentPage * notesPerPage;
	const indexOfFirstNote = indexOfLastNote - notesPerPage;
	const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

	const paginate = pageNum => this.setState({currentPage: pageNum});

	const nextPage = () => {
	  if (indexOfLastNote < notes.length) {
		this.setState({currentPage: currentPage + 1});
	  }
	};

	const prevPage = () => {
	  if (this.state.currentPage !== 1) {
		this.setState({currentPage: currentPage - 1});
	  }
	};


	return(
	  <div className="App">
		<BrowserRouter>
		  <Navigation/>
		  <ErrorBoundry>
		  <Route exact path='/notes' render={(props) => (
			  <Pagination
				  {...props}
				  notesPerPage={notesPerPage}
				  totalNotes={notes.length}
				  paginate={paginate}
				  nextPage={nextPage}
				  prevPage={prevPage}
			  />
		  )} />
		  <Route exact path='/notes' render={(props) => (<NoteList {...props} notes={currentNotes} deleteNote={this.deleteNote} loading={loading}/>)} />
		  <Route exact path='/' component={CreateNote} />
		  </ErrorBoundry>
		</BrowserRouter>
	  </div>
	)
  }
}

export default App;
