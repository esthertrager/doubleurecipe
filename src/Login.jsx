import React from 'react';

class Login extends React.Component {

		handleInputChange(event) {
		    const target = event.target;
	      const value = target.value;
	      const name = target.name;

      	this.setState({
	        [name]: value
	      }
		}
  render() {
  	return (
	  	<form>
	  	  <div className="form-group">
	  	    <label htmlFor="username">Username</label>
	  	    <input 	type="text" 
	  	    				className="form-control" 
	  	    				id="username" 
	  	    				placeholder="Username" 
	  	    				onChange={this.handleInputChange} />
	  	  </div>
	  	  <div className="form-group">
	  	    <label htmlFor="exampleInputPassword1">Password</label>
	  	    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
	  	  </div>
	  	  <button type="submit" className="btn btn-primary">Submit</button>
	  	  <btn className="btn">Create Account</btn>
	  	</form>
	  );
	}
}

export default Login;
