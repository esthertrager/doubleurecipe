import React from 'react';
import RecipeList from './RecipeList.jsx';
import Recipe from './Recipe.jsx';
import AddEditRecipe from './AddEditRecipe.jsx';

class Component extends React.Component {
  constructor() {
    super();
    fetch('/api/recipes').then((response) => {
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
    this.onClickAddEditRecipe = this.onClickAddEditRecipe.bind(this);
    this.onClickDeleteRecipe = this.onClickDeleteRecipe.bind(this);
    this.onClickSaveRecipe = this.onClickSaveRecipe.bind(this);

  }

  onClickRecipe(event, id) {
    event.preventDefault();
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

  onClickAddEditRecipe(recipe) {
    this.setState({
      recipe: recipe || {
          name: '',
          ingredients: [{}]
      },
      isEditing: true
    });
  }

  onClickDeleteRecipe(id) {
    fetch(`/api/recipes/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    }).then(() => {
      const recipes = this.state.recipes;
      const index = recipes.findIndex((_recipe) => {
        return _recipe.id === id;
      });

      recipes.splice(index, 1);
      this.setState({
        recipes,
        recipe: null,
        isEditing: false
      });
    });
  }

  onClickSaveRecipe(event, recipe) {
    event.preventDefault();
    if ('id' in recipe) {
      fetch(`/api/recipes/${recipe.id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(recipe)
      }).then((response) => {
        return response.json();
      }).then((recipe) => {
        const recipes = this.state.recipes;

        const index = recipes.findIndex((_recipe) => {
          return recipe.id === _recipe.id;
        });

        recipes[index] = recipe;
        this.setState({
          recipes,
          recipe: null,
          isEditing: false
        });
      });
    } else {
    fetch('/api/recipes', {
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
  }

  render() {
    if (this.state.recipe && this.state.isEditing) {
      return (<AddEditRecipe
        recipe={this.state.recipe}
        onClickSaveRecipe={this.onClickSaveRecipe}
      />);
    } else if (this.state.recipe) {
      return (<Recipe
        recipe={this.state.recipe}
        onClickBack={this.onClickBack}
        onClickAddEditRecipe={this.onClickAddEditRecipe}
      />);
    } else if (this.state.recipes) {

      return (
        <RecipeList
          onClickRecipe={this.onClickRecipe}
          recipes={this.state.recipes}
          onClickAddEditRecipe={this.onClickAddEditRecipe}
          onClickDeleteRecipe={this.onClickDeleteRecipe}
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
