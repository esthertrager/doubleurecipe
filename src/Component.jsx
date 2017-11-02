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

  render() {
    if (this.state.recipe && this.state.isEditing) {
      return (<AddEditRecipe
      />);
    } else if (this.state.recipe) {
      return (<Recipe
        recipe={this.state.recipe}
        onClickBack={this.onClickBack.bind(this)}
      />);
    } else if (this.state.recipes) {

      return (
        <RecipeList
          onClick={this.onClickRecipe.bind(this)}
          recipes={this.state.recipes}
          onClickAddRecipe={this.onClickAddRecipe.bind(this)}
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
