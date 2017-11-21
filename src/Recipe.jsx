import React from 'react';

class Recipe extends React.Component {
  render() {
    const recipe = this.props.recipe;

    const ingredients = recipe.ingredients.map((ingredient, index) => {

    return (
	      	<li key={index}> {ingredient.amount} {ingredient.unit || ''} {ingredient.name}</li>
	    );
  	});

    const total = recipe.total || {};

    return (
    	<div>
	    	<h3>{recipe.name}</h3>
	    	<ul> {ingredients} </ul>
        <div>{total.quantity} {total.unit}</div>
        <div>{recipe.directions}</div>
        <button onClick={() => this.props.onClickAddEditRecipe(recipe)}>Edit Recipe</button>
	    	<button onClick={this.props.onClickBack}>Back</button>
	     </div>
    );
  }
}

Recipe.propTypes = {
    recipe: React.PropTypes.object.isRequired,
    onClickBack: React.PropTypes.func.isRequired,
    onClickAddEditRecipe: React.PropTypes.func.isRequired
};

export default Recipe;
