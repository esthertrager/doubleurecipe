import React from 'react';

class Profile extends React.Component {
	constructor(props) {
		super();
		this.state = {
			user: props.user
		};

		this.onClickSaveUser = this.onClickSaveUser.bind(this);
		this.onChangeUserName = this.onChangeUserName.bind(this);
	}

	onChangeUserName(e) {
		const name = e.target.value;
		const user = Object.assign({}, this.state.user);
		user.name = name;
		this.setState({ user });
	}

	onClickSaveUser(e) {
		e.preventDefault();
		return fetch(`/api/users/${this.state.user._id}`, {
			credentials: 'include',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  method: 'PUT',
		  body: JSON.stringify(this.state.user)
		}).then((response) => {
			if (!response.ok) {
			  throw response.text();
			}
		  return response.json();
		}).then((user) => {
		  window.location.assign('/recipes');
		}, (error) => {
			error.then(e => alert(e));
		});
	}

  render() {
  	return (
	  	<form>
	  	  <div className="form-group">
	  	    <label htmlFor="username">Username</label>
	  	    <input 
	  	    	type="text"
	  	    	className="form-control"
	  	    	id="username"
	  	    	placeholder="Username" 
	  	    	onChange={this.onChangeUserName}
	  	    	value={this.state.user.name}/>
	  	  </div>
	  	  <button
	  	  	type="submit"
	  	  	className="btn btn-primary"
	  	  	onClick={this.onClickSaveUser}>save</button>
	  	</form>
	  );
	}
}

export default Profile;
