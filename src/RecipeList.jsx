import React from 'react';
import { Link } from 'react-router-dom';

class RecipeList extends React.Component {
  render() {
  	const recipes = this.props.recipes.map((recipe) => {

  		return (
	      	<li key={recipe.id}>
            <Link to={`/${recipe.id}`}>{recipe.name}</Link>
            <button className="btn btn-sm" onClick={() => this.props.onClickDeleteRecipe(recipe.id)}>-</button>
          </li>
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
	onClickDeleteRecipe: React.PropTypes.func.isRequired,
	recipes: React.PropTypes.array.isRequired
};

export default RecipeList;
