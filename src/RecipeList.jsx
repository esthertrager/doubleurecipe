import React from 'react';

class RecipeList extends React.Component {
  render() {

  	const recipes = this.props.recipes.map((recipe) => {

  		return (
	      	<li key={recipe.id} onClick={() => this.props.onClick(recipe.id)}>{recipe.name}</li>
	    );
  	});

  	return (
  		<div>
	  		<h3> Recipes </h3>
	  		<ul>{recipes}</ul>
  		</div>
  	);
  }
}

RecipeList.propTypes = {
	onClick: React.PropTypes.func.isRequired,
	recipes: React.PropTypes.array.isRequired
};

export default RecipeList;
