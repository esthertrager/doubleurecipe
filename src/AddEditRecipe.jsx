import React from 'react';

class AddEditRecipe extends React.Component {
	constructor(props) {
      super(props);
      this.state = props.recipe;
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    onClickAddIngredient(event) {
    	event.preventDefault();
    	const ingredients = this.state.ingredients;

    	ingredients.push({});
    	this.setState({
    		ingredients
    	});
    }

	handleInputChange(event) {
	    const target = event.target;
        const value = target.value;
        const name = target.name;

        const path = name.split('_');

        if (path[0] === 'name') {
        	this.setState({
		        name: value
		    });
        } else if (path[0] === 'ingredient') {
        	this.updateIngredient(path[1], value, path[2]);
        }
	}

	updateIngredient(key, value, index) {
		const ingredients = this.state.ingredients;

		ingredients[index][key] = value;
		this.setState({
			ingredients
		});
	}

	renderIngredients() {
		return this.state.ingredients.map((ingredient, index) => {
			return (
				<div className="form-group" key={index}>
				    <label htmlFor={`ingredient_amount_${index}`}>Amount</label>
				    <input
					    className="form-control"
					    id={`ingredient_amount_${index}`}
					    name={`ingredient_amount_${index}`}
					    onChange={this.handleInputChange}
					    placeholder="Amount"
					    type="text"
					    value={this.state.ingredients[index].amount || ''} />
				    <label htmlFor={`ingredient_unit_${index}`}>Unit</label>
				    <input
					    className="form-control"
					    id={`ingredient_unit_${index}`}
					    name={`ingredient_unit_${index}`}
					    onChange={this.handleInputChange}
					    placeholder="Unit"
					    type="text"
					    value={this.state.ingredients[index].unit || ''} />
				    <label htmlFor={`ingredient_name_${index}`}>Ingredient Name</label>
				    <input
					    className="form-control"
					    id={`ingredient_name_${index}`}
					    onChange={this.handleInputChange}
					    name={`ingredient_name_${index}`}
					    placeholder="Name"
					    type="text"
					    value={this.state.ingredients[index].name || ''} />
				</div>
			);
		});
	}

  	render() {
	  	return (
	  		<div>Add Recipe
		  		<form>
				  <div className="form-group">
				    <label htmlFor="name">Recipe Name</label>
				    <input
					    aria-describedby="emailHelp"
					    className="form-control"
					    id="name"
					    name="name"
					    // this is equivalent to onChange={(e) => this.handleInputChange(e)}
					    onChange={this.handleInputChange}
					    placeholder="Recipe Name"
					    type="text"
					    value={this.state.name} />
				  </div>
				  {this.renderIngredients()}
				  <button onClick={(event) => this.onClickAddIngredient(event)}>+</button>
				  <button onClick={(event) => this.props.onClickSaveRecipe(event, this.state)}>Save Recipe</button>
				</form>
			</div>
	  	);
  }
}

AddEditRecipe.propTypes = {
	recipe: React.PropTypes.object.isRequired,
	onClickSaveRecipe: React.PropTypes.func.isRequired
};

export default AddEditRecipe;
