import React from 'react';
import RecipeList from './RecipeList.jsx';
import Recipe from './Recipe.jsx';
import AddEditRecipe from './AddEditRecipe.jsx';

class Component extends React.Component {
  constructor() {
    super();
    fetch('http://localhost:3000/recipes').then((response) => {
      return response.json();
    }).then((recipes) => {
      this.setState({
        recipes
      });
    });

    this.state = {
      recipes: null,
      recipe: null,
      isEditing: false
    };

    this.onClickRecipe = this.onClickRecipe.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickAddRecipe = this.onClickAddRecipe.bind(this);
    this.onClickSaveRecipe = this.onClickSaveRecipe.bind(this);

  }

  onClickRecipe(id) {
    this.setState({
      recipe: this.state.recipes.find((recipe) => {
        return recipe.id === id;
      })
    });
  }

  onClickBack(event) {
    this.setState({
      recipe: null
    });
  }

  onClickAddRecipe() {
    this.setState({
      recipe: {},
      isEditing: true
    });
  }

  onClickSaveRecipe(event, recipe) {
    event.preventDefault();
    fetch('http://localhost:3000/recipes', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(recipe)
    }).then((response) => {
      return response.json();
    }).then((recipe) => {
      const recipes = this.state.recipes;

      recipes.push(recipe);
      this.setState({
        recipes,
        recipe: null,
        isEditing: false
      });
    });
  }

  render() {
    if (this.state.recipe && this.state.isEditing) {
      return (<AddEditRecipe
        onClickSaveRecipe={this.onClickSaveRecipe}
      />);
    } else if (this.state.recipe) {
      return (<Recipe
        recipe={this.state.recipe}
        onClickBack={this.onClickBack}
      />);
    } else if (this.state.recipes) {

      return (
        <RecipeList
          onClickRecipe={this.onClickRecipe}
          recipes={this.state.recipes}
          onClickAddRecipe={this.onClickAddRecipe}
        />
      );
    }

    return (
      <div>Loading...</div>
    );
  }
}

Component.propTypes = {
};

export default Component;
