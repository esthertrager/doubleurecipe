import React from 'react';
import App from './App';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';

class LayoutContainer extends React.Component {
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
					  </div>
					</nav>
					<div className="container" style={{'padding-top':'70px'}}>
					    <div className="row">
					        <div className="col-sm">
					            <App />
					        </div>
					    </div>
					</div>
				</div>
			</Router>
		);
	}
}

export default LayoutContainer;