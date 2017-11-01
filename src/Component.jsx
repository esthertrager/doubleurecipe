import React from 'react';
import RecipeList from './RecipeList.jsx';
import Recipe from './Recipe.jsx';

class Component extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [{
        id: 1,
        name: 'Challah',
        ingredients: [{
          name: 'eggs',
          amount: 2,
          unit: null
        }]
      }, {
        id: 2,
        name: 'Sourdough',
        ingredients: [{
          name: 'flour',
          amount: 500,
          unit: 'grams'
        }, {
          name: 'water',
          amount: 400,
          unit: 'grams'
        }, {
          name: 'salt',
          amount: 10,
          unit: 'grams'
        }]
      }],
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
    }

    return (
      <RecipeList
        onClick={this.onClickRecipe.bind(this)}
        recipes={this.state.recipes}
      />
    );
  }
}

Component.propTypes = {
};

export default Component;
