import React from 'react';
import RecipeList from './RecipeList.jsx';
import Recipe from './Recipe.jsx';
import Profile from './Profile.jsx';
import ScaleRecipe from './ScaleRecipe.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    fetch('/api/recipes', {
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((recipes) => {
      this.setState({
        recipes
      });
    });

    fetch('/api/users/current', {
      credentials: 'include'
    }).then((response) => {
      if (response.status === 204) {
        return null;
      }
      return response.json();
    }).then((user) => {
      this.setState({
        user
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    }).then((response) => {
      if (!response.ok) {
        throw response;
      }
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
        credentials: 'include',
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
      credentials: 'include',
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
    if (this.state.recipes && this.state.user !== undefined) {
      return (
          <Switch>
            <Route exact path="/" render={() => {
              return (
                <div>
                  <h1>Kukeze</h1>
                  <h2>Create, Share and Scale Your Recipes</h2>
                  {this.state.user ? <Link to="/recipes">Go to My Recipes</Link> : <Link to="/recipes">Recipes</Link>}
                  <br/>
                  {this.state.user ? <a href="/api/auth/logout">Logout</a> : <a href="/api/auth/google">Sign In With Google</a>}
                </div>
              );
            }} />

            <Route exact path="/profile" render={() => {
              return (
                <Profile
                  user={this.state.user} />
              );
            }}
            />

            <Route exact path="/recipes" render={() => {
              return (
                <div>
                  { this.state.user ? <Link to="/recipes/create">Add Recipe</Link> : '' }
                  <RecipeList
                    recipes={this.state.recipes}
                    onClickDeleteRecipe={this.onClickDeleteRecipe}
                    user={this.state.user}
                  />
                </div>
              );
            }} />

            <Route exact path="/recipes/create" render={() => {
              const newRecipe = {
                name: '',
                ingredients: [{}]
              };

              return (
                <Recipe
                  recipe={newRecipe}
                  onClickSaveRecipe={this.onClickSaveRecipe}
                  user={this.state.user}
                />
              );
            }} />


            <Route path="/recipes/:id/scale" render={({ match }) => {
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
            
            <Route path="/recipes/:id" render={({ match }) => {
              const recipe = this.state.recipes.find((_recipe) => {
                return _recipe.id === match.params.id;
              });

              return (
                <Recipe
                  recipe={recipe}
                  onClickSaveRecipe={this.onClickSaveRecipe}
                  match={match}
                  user={this.state.user}
                />
              );
            }} />

          </Switch>
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
