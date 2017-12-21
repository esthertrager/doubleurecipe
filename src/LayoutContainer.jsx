import React from 'react';
import App from './App';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';

class LayoutContainer extends React.Component {
	constructor(props) {
	  super(props);
	  fetch('/api/recipes', {
	    credentials: 'include'
	  }).then((response) => {
	    return response.json();
	  }).then((recipes) => {
	    this.setState({
	      recipes
	    });
	  });

	  fetch('/api/users/current', {
	    credentials: 'include'
	  }).then((response) => {
	    if (response.status === 204) {
	      return null;
	    }
	    return response.json();
	  }).then((user) => {
	    this.setState({
	      user
	    });
	  });

	  this.state = {
	    recipes: null
	  };
	}

	renderApp() {
		if (this.state.recipes && this.state.user !== undefined) {
			return (
				<App 
					user={this.state.user}
					recipes={this.state.recipes}
				/>
			);
		}

		return (
		  <div>Loading...</div>
		);
	}

	renderUserDropdown() {
		const loginLink = () => (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item active">
					<a className="nav-link" href="/api/auth/google">Login</a>
				</li>
			</ul>
		);
		const userDropdown = () => (
			<ul className="navbar-nav ml-auto">
			<li className="nav-item active dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				  {this.state.user.name}
				</a>
				<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
				  <Link className="dropdown-item" to="/profile">Profile</Link>
				  <div className="dropdown-divider"></div>
				  <a className="dropdown-item" href="/api/auth/logout">Logout</a>
				</div>
			</li>
			</ul>
		)

		return this.state.user ? userDropdown() : loginLink();
	}

	render() {
		return (
			<Router>
				<div>
					<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
					  <Link className="navbar-brand" to="/">Kukeze</Link>
					  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
					    <span className="navbar-toggler-icon"></span>
					  </button>
					  <div className="collapse navbar-collapse" id="navbarCollapse">
					    <ul className="navbar-nav mr-auto">
					      <li className="nav-item active">
					      	<Link className="nav-link" to="/recipes">Recipes</Link>
					      </li>
					     
					    </ul>
                {this.renderUserDropdown()}
					  </div>
					</nav>
					<div className="container" style={{paddingTop:'70px'}}>
					    <div className="row">
					        <div className="col-sm">
					            {this.renderApp()}
					        </div>
					    </div>
					</div>
				</div>
			</Router>
		);
	}
}

export default LayoutContainer;