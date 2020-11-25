import React, { Component } from 'react';
import API from '../../api';
import './CreateNote.css';

export default class CreateNote extends Component {

  constructor(props) {
	super(props);
	this.state = {
	  image: null,
	  data: '',
	  name: '',
	  loading: false,
	  formErrors: {data: '', name: ''},
	  dataValid: false,
	  nameValid: false,
	  formValid: false
	};
  }

  onFileChange = (e) =>  {
	this.setState({ image: e.target.files[0] })
  };

  onSubmit = async (e) => {
	e.preventDefault();
	this.setState({loading: true});
	const {name, data, image} = this.state;

	if (image) {
	  const ImageData = new FormData();
	  const imageName = `${name}--${Date.now()}.jpg`;

	  await API.post('/', {name, data, image: `images/${imageName}`}, {});

	  ImageData.append('image', image, imageName);

	  await API.post('/image', ImageData, {});
	  this.setState({loading: false, data: '', image: null, name: ''});
	} else {
	  await API.post('/', {name, data}, {});
	  this.setState({loading: false, data: '', image: null, name: ''});
	}
  };

  validateField = (fieldName, value) => {
	let fieldValidationErrors = this.state.formErrors;
	let dataValid = this.state.dataValid;
	let nameValid = this.state.nameValid;
	switch(fieldName) {
	  case 'data':
		dataValid = value.length >= 10;
		fieldValidationErrors.data = dataValid ? '' : 'Not enough data';
		break;
	  case 'name':
		nameValid = value.length >= 3;
		fieldValidationErrors.name = nameValid ? '' : 'Name is too short.';
		break;
	  default:
		break;
	}
	this.setState({formErrors: fieldValidationErrors,
	  dataValid,
	  nameValid,
	}, this.validateForm);
  };

  validateForm = () => this.setState({formValid: this.state.dataValid && this.state.nameValid});

  handleUserInput = (e) => {
	const name = e.target.name;
	const value = e.target.value;
	this.setState({[name]: value},
		() => { this.validateField(name, value) });
  };

  errorClass = (error) => error.length === 0 ? '' : 'has-error';

  render() {
	const {data,name, formValid, image, loading} = this.state;
	return (
		<div className="container d-flex justify-content-center mt-3 mb-2">
		  <div className="row">
			<form
				onSubmit={this.onSubmit}
				style={{border: '1px solid purple', padding: '10px'}}
				className="bg-light"
			>
			  <div className="input-group mb-3">
				<div className="input-group-prepend">
				  <span className="input-group-text">Upload</span>
				</div>
				<div className="custom-file">
				  <input type="file" className="custom-file-input" id="inputIMG" onChange={this.onFileChange}/>
				  <label className="custom-file-label" htmlFor="inputIMG">
					{image ? 'Image selected' : 'Choose file'}
				  </label>
				</div>
			  </div>
			  <div className="”form-group”">
				<label htmlFor="”name”">Name</label>
				<input
					type="text"
					className={`form-control ${this.errorClass(this.state.formErrors.name)}`}
					value={name}
					onChange={this.handleUserInput}
					name="name" />
				{this.state.formErrors.name &&
				  <div className="alert alert-danger" role="alert">
					{this.state.formErrors.name}
				  </div>
				}
			  </div>
			  <div className="”form-group”">
				<label htmlFor="”data”">Note :</label>
				<textarea
					className={`form-control ${this.errorClass(this.state.formErrors.data)}`}
					onChange={this.handleUserInput}
					value={data}
					name="data" />
				{this.state.formErrors.data &&
				<div className="alert alert-danger" role="alert">
				  {this.state.formErrors.data}
				</div>
				}
			  </div>
			  <div className="form-group" style={{marginTop: '10px'}}>
				<button className="btn btn-primary" type="submit" disabled={!formValid}>
				  {loading ? 'Saving...' : 'Save'}
				</button>
			  </div>
			</form>
		  </div>
		</div>
	)
  }
}
