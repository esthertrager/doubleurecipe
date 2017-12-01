'use strict';
import React from 'react';

class ScaleRecipe extends React.Component {
	constructor(props) {
      super(props);
      this.state = Object.assign({}, props.recipe);
      this.handleInputChange = this.handleInputChange.bind(this);
    }

	handleInputChange(event) {
	    const target = event.target;
        const value = parseFloat(target.value);
        const name = target.name;

        const path = name.split('_');

        const index = path[2];

        if (!isNaN(value) && value > 0) {
        	const oldValue = this.props.recipe.ingredients[index].amount;
	        const scalingFactor = value / oldValue;

	        const scaledIngredients = this.props.recipe.ingredients.map((ingredient) => {
	        	const ingredientCopy = Object.assign({}, ingredient);

	        	ingredientCopy.amount = scalingFactor * ingredientCopy.amount;
	        	return ingredientCopy;
	        });

	        const scaledTotal = this.props.recipe.total.quantity * scalingFactor;

	        this.setState({
	        	ingredients: scaledIngredients,
	        	total: {
	        		quantity: scaledTotal,
	        		unit: this.state.total.unit
	        	}
	        });
        } else {
			const ingredients = this.state.ingredients.map((ingredient) => {

				return Object.assign({}, ingredient);
			});
			ingredients[index].amount = event.target.value;
			this.setState({
				ingredients
			});
        }
	}

	updateIngredient(key, value, index) {
		const ingredients = this.state.ingredients;

		ingredients[index][key] = value;
		this.setState({
			ingredients
		});
	}

	updateTotal(key, value, index) {
		const total = this.state.total || {};

		total[key] = value;
		this.setState({
			total
		});
	}

	renderIngredients() {
		return this.state.ingredients.map((ingredient, index) => {
			return (
				<div className="form-row form-group" key={index}>
					<div className="form-group col-3">
					    <label htmlFor={`ingredient_amount_${index}`}>Quantity</label>
					    <input
						    className="form-control"
						    id={`ingredient_amount_${index}`}
						    name={`ingredient_amount_${index}`}
						    onChange={this.handleInputChange}
						    placeholder="Quantity"
						    type="text"
						    value={this.state.ingredients[index].amount || ''} />
					</div>
					<div className="form-group col-4">
					    <label htmlFor={`ingredient_unit_${index}`}>Unit</label>
					    <input
						    className="form-control"
						    id={`ingredient_unit_${index}`}
						    name={`ingredient_unit_${index}`}
						    onChange={this.handleInputChange}
						    placeholder="Unit"
						    type="text"
						    value={this.state.ingredients[index].unit || ''} />
					</div>
					<div className="form-group col-5">
					    <label htmlFor={`ingredient_name_${index}`}>Name</label>
					    <input
					 		readOnly
						    className="form-control"
						    id={`ingredient_name_${index}`}
						    onChange={this.handleInputChange}
						    name={`ingredient_name_${index}`}
						    placeholder="Name"
						    type="text"
						    value={this.state.ingredients[index].name || ''} />
					</div>
				</div>
			);
		});
	}

  	render() {
  		const total = this.state.total || {};

	  	return (
	  		<div>
	  			<h3>{ this.state.name }</h3>
		  		<form>
				  <div className="row">
				  	<div className="col-12">
				  		<h4>Ingredients</h4>

				  	</div>
				  </div>
				  {this.renderIngredients()}
				  <h4>Yield</h4>
				  <div className="form-row form-group">
					  <div className="form-group col-4">
					    <label htmlFor="name">Quantity</label>
					    <input
						    className="form-control"
						    id="total_quantity"
						    name="total_quantity"
						    onChange={this.handleInputChange}
						    placeholder="Quantity"
						    type="text"
						    value={total.quantity || ''} />
					  </div>
					  <div className="form-group col-4">
					    <label htmlFor="name">Unit</label>
					    <input
						    className="form-control"
						    id="total_unit"
						    name="total_unit"
						    onChange={this.handleInputChange}
						    placeholder="Unit"
						    type="text"
						    value={total.unit || ''} />
					  </div>
					</div>
				  <div className="form-group">
				    <label htmlFor="name">Directions</label>
				    <textarea readOnly
					    className="form-control"
					    id="directions"
					    name="directions"
					    rows="5"
					    onChange={this.handleInputChange}
					    placeholder="Directions"
					    value={this.state.directions || ''} />
				  </div>
				  <button className="btn">View</button>
				</form>
			</div>
	  	);
  }
}

export default ScaleRecipe;
