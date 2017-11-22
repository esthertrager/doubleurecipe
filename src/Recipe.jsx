import React from 'react';
import { Link } from 'react-router-dom';
import AddEditRecipe from './AddEditRecipe.jsx';

class Recipe extends React.Component {
  constructor() {
    super();

    this.state = {
      isEditing: false
    };

    this.onClickAddEditRecipe = this.onClickAddEditRecipe.bind(this);
    this.onClickSaveRecipe = this.onClickSaveRecipe.bind(this);
  }

  onClickAddEditRecipe() {
    this.setState({
      isEditing: true
    });
  }

  onClickSaveRecipe(e) {
    e.preventDefault();
    this.props.onClickSaveRecipe(e, this.props.recipe)
      .then(() => {
        this.setState({
          isEditing: false
        });
      })
  }

  render() {
    const recipe = this.props.recipe;

    const ingredients = recipe.ingredients.map((ingredient, index) => {
      return (
        <li key={index}> {ingredient.amount} {ingredient.unit || ''} {ingredient.name}</li>
      );
  	});

    const total = recipe.total || {};

    if (this.state.isEditing) {
      return (
        <AddEditRecipe
          recipe={this.props.recipe}
          onClickSaveRecipe={this.onClickSaveRecipe}
        />);
    }

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
