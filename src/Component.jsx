import React from 'react';
import RecipeList from './RecipeList.jsx';
import Recipe from './Recipe.jsx';
import AddEditRecipe from './AddEditRecipe.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

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
      isEditing: false
    };

    this.onClickAddEditRecipe = this.onClickAddEditRecipe.bind(this);
    this.onClickDeleteRecipe = this.onClickDeleteRecipe.bind(this);
    this.onClickSaveRecipe = this.onClickSaveRecipe.bind(this);

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
      return fetch(`/api/recipes/${recipe.id}`, {
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
    return fetch('/api/recipes', {
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
      return recipe;
    });
    }
  }

  render() {
    if (this.state.recipes) {

      return (
        <Router>
          <Switch>
            <Route exact path="/" render={() => {
              return (
                <div>
                  <Link to="/create">Add Recipe</Link>
                  <RecipeList
                    recipes={this.state.recipes}
                    onClickAddEditRecipe={this.onClickAddEditRecipe}
                    onClickDeleteRecipe={this.onClickDeleteRecipe}
                  />
                </div>
              );
            }} />
            
            <Route exact path="/create" render={() => {
              const newRecipe = {
                name: '',
                ingredients: [{}]
              };

              const onClickSaveRecipe = (e, recipe) => {
                e.preventDefault();
                this.onClickSaveRecipe(e, recipe)
                  .then((recipe) => {
                    window.location.assign(`/${recipe.id}`);
                  });
              };

              return (
                <AddEditRecipe
                  recipe={newRecipe}
                  onClickSaveRecipe={onClickSaveRecipe}
                />);
            }} />

            <Route path="/:id" render={({ match }) => {
              const recipe = this.state.recipes.find((_recipe) => {
                return _recipe.id === match.params.id;
              });

              return (
                <Recipe
                  recipe={recipe}
                  onClickSaveRecipe={this.onClickSaveRecipe}
                />
              );
            }} />


          </Switch>
        </Router>
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
