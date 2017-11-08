import React from 'react';

class Recipe extends React.Component {
  render() {

    const ingredients = this.props.recipe.ingredients.map((ingredient, index) => {

    return (
	      	<li key={index}> {ingredient.amount} {ingredient.unit || ''} {ingredient.name}</li>
	    );
  	});

    return (
    	<div>
	    	<h3>{this.props.recipe.name}</h3>
	    	<ul> {ingredients} </ul>
        <button onClick={this.props.onClickAddRecipe}>Edit Recipe</button>
	    	<button onClick={this.props.onClickBack}>Back</button>
	     </div>
    );
  }
}

Recipe.propTypes = {
    recipe: React.PropTypes.object.isRequired,
    onClickBack: React.PropTypes.func.isRequired
};

export default Recipe;
