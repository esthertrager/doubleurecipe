import React from 'react';

class RecipeList extends React.Component {
  render() {

    const addRecipeButton = (<button onClick={this.props.onClickAddRecipe}>Add Recipe</button>);

  	const recipes = this.props.recipes.map((recipe) => {

  		return (
	      	<li key={recipe.id} onClick={() => this.props.onClick(recipe.id)}>{recipe.name}</li>
	    );
  	});

  	return (
  		<div>
	  		<h3> Recipes </h3>
        {addRecipeButton}
	  		<ul>{recipes}</ul>
  		</div>
  	);
  }
}

RecipeList.propTypes = {
  onClick: React.PropTypes.func.isRequired,
	onClickAddRecipe: React.PropTypes.func.isRequired,
	recipes: React.PropTypes.array.isRequired
};

export default RecipeList;
