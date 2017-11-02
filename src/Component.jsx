import React from 'react';
import RecipeList from './RecipeList.jsx';
import Recipe from './Recipe.jsx';

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
      recipe: null
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

  render() {
    if (this.state.recipe) {
      return (<Recipe
        recipe={this.state.recipe}
        onClickBack={this.onClickBack.bind(this)}
      />);
    } else if (this.state.recipes) {

      return (
        <RecipeList
          onClick={this.onClickRecipe.bind(this)}
          recipes={this.state.recipes}
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
