import React from 'react';

class RecipeList extends React.Component {
  render() {

    const addRecipeButton = (<button
                                className="btn btn-primary"
                                onClick={() => this.props.onClickAddEditRecipe()}>Add Recipe</button>);

  	const recipes = this.props.recipes.map((recipe) => {

  		return (
	      	<li key={recipe.id}>
            <a href="#" onClick={(e) => this.props.onClickRecipe(e, recipe.id)}>{recipe.name}</a>
            <button className="btn btn-sm" onClick={() => this.props.onClickDeleteRecipe(recipe.id)}>-</button>
          </li>
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
  onClickRecipe: React.PropTypes.func.isRequired,
  onClickAddEditRecipe: React.PropTypes.func.isRequired,
	onClickDeleteRecipe: React.PropTypes.func.isRequired,
	recipes: React.PropTypes.array.isRequired
};

export default RecipeList;
