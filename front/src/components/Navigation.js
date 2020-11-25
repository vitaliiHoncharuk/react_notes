import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
	  <div>
		<Navbar bg="light" expand="lg">
		  <Navbar.Brand as={Link} to="/">Notify</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
			  <Nav.Link as={Link} to="/">Create note</Nav.Link>
			  <Nav.Link as={Link} to="/notes">List notes</Nav.Link>
			</Nav>
		  </Navbar.Collapse>
		</Navbar>
	  </div>
  );
};


export default Navigation;
