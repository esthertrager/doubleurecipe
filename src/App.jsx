import React from 'react';
import RecipeList from './RecipeList.jsx';
import Recipe from './Recipe.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ScaleRecipe from './ScaleRecipe.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class App extends React.Component {
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
      recipes: null
    };

    this.onClickDeleteRecipe = this.onClickDeleteRecipe.bind(this);
    this.onClickSaveRecipe = this.onClickSaveRecipe.bind(this);
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
        recipes
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
          recipes
        });

        return recipe;
      });
    }

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
        recipes
      });

      return recipe;
    });
  }

  render() {
    if (this.state.recipes) {
      return (
        <Router>
          <Switch>
            <Route exact path="/login" component={Login}
            />

            <Route exact path="/register" component={Register}
            />

            <Route exact path="/" render={() => {
              return (
                <div>
                  <Link to="/create">Add Recipe</Link>
                  <RecipeList
                    recipes={this.state.recipes}
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

              return (
                <Recipe
                  recipe={newRecipe}
                  onClickSaveRecipe={this.onClickSaveRecipe}
                />
              );
            }} />


            <Route path="/:id/scale" render={({ match }) => {
              const recipe = this.state.recipes.find((_recipe) => {
                return _recipe.id === match.params.id;
              });
              return (
                <ScaleRecipe
                  recipe={recipe}
                  //onClickSaveRecipe={this.onClickSaveRecipe}
                />
              );
            }} />
            
            <Route path="/:id" render={({ match }) => {
              const recipe = this.state.recipes.find((_recipe) => {
                return _recipe.id === match.params.id;
              });

              return (
                <Recipe
                  recipe={recipe}
                  onClickSaveRecipe={this.onClickSaveRecipe}
                  match={match}
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

App.propTypes = {
};

export default App;
