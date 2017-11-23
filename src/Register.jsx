import React from 'react';

class Register extends React.Component {
  render() {
  	return (
	  	<form>
	  	  <div className="form-group">
	  	    <label htmlFor="username">Username</label>
	  	    <input type="text" className="form-control" id="username" placeholder="Username" />
	  	  </div>
	  	  <div className="form-group">
	  	    <label htmlFor="exampleInputPassword1">Password</label>
	  	    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
	  	  </div>
	  	  <div className="form-group">
	  	    <label htmlFor="confirmPassword">Confirm Password</label>
	  	    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
	  	  </div>
	  	  <button type="submit" className="btn btn-primary">Submit</button>
	  	</form>
	  );
	}
}

export default Register;
