import React from 'react';
import { Link } from 'react-router-dom';
import AddEditRecipe from './AddEditRecipe.jsx';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    const isEditing = props.recipe.id ? false : true;
    
    this.state = { isEditing };

    this.onClickAddEditRecipe = this.onClickAddEditRecipe.bind(this);
    this.onClickSaveRecipe = this.onClickSaveRecipe.bind(this);
  }

  onClickAddEditRecipe() {
    this.setState({
      isEditing: true
    });
  }

  onClickSaveRecipe(e, recipe) {
    e.preventDefault();
    this.props.onClickSaveRecipe(e, recipe)
      .then((_recipe) => {
        window.location.assign(`/${_recipe.id}`);
      });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <AddEditRecipe
          recipe={this.props.recipe}
          onClickSaveRecipe={this.onClickSaveRecipe}
        />);
    }

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
	    	<ul>{ingredients}</ul>
        <div>{total.quantity} {total.unit}</div>
        <div>{recipe.directions}</div>
        <button onClick={this.onClickAddEditRecipe}>Edit Recipe</button>
        <Link to="/">Back</Link>
	    </div>
    );
  }
}

Recipe.propTypes = {
    recipe: React.PropTypes.object.isRequired,
    onClickSaveRecipe: React.PropTypes.func.isRequired
};

export default Recipe;
