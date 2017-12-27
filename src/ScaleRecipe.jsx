'use strict';
import React from 'react';
import convert from 'recipe-unit-converter';

class ScaleRecipe extends React.Component {
	constructor(props) {
      super(props);
      this.state = Object.assign({}, props.recipe);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleUnitChange = this.handleUnitChange.bind(this);
      this.handleTotalUnitChange = this.handleTotalUnitChange.bind(this);
    }

    scale(scalingFactor) {
    	const scaledIngredients = this.props.recipe.ingredients.map((ingredient) => {
        const ingredientCopy = Object.assign({}, ingredient);
        	ingredientCopy.amount = scalingFactor * parseFloat(ingredientCopy.amount);
        	ingredientCopy.amount = +ingredientCopy.amount.toFixed(2);
        	
        	return ingredientCopy;
        });

        const scaledTotal = Object.assign({}, this.props.recipe.total);
        scaledTotal.quantity = scaledTotal.quantity * parseFloat(scalingFactor);
        scaledTotal.quantity = +scaledTotal.quantity.toFixed(2);

        return {
        	ingredients: scaledIngredients,
        	total: scaledTotal
        };
    }

    scaleUnit(scalingFactor, unitIndex, value) {
    	const scaledIngredients = this.props.recipe.ingredients.map((ingredient, index) => {
        const ingredientCopy = Object.assign({}, ingredient);
        	if (parseInt(unitIndex) !== index) {
        		ingredientCopy.amount = scalingFactor * ingredientCopy.amount;
        	} else {
        		ingredientCopy.unit = value;
        	}

        	return ingredientCopy;
        });

        const scaledTotal = Object.assign({}, this.props.recipe.total);
        scaledTotal.quantity = scaledTotal.quantity * scalingFactor

        this.setState({
        	ingredients: scaledIngredients,
        	total: scaledTotal
        });
    }

	handleInputChange(event) {
	    const input = event.target;
        const value = parseFloat(input.value);
        const name = input.name;

        const path = name.split('_');

        const index = path[2];

        let scaledRecipe;

        if (!isNaN(value) && value > 0) {
        	if (path[0] == 'ingredient') {
	        	const oldValue = this.props.recipe.ingredients[index].amount;
		        const scalingFactor = value / oldValue;

		        scaledRecipe = this.scale(scalingFactor);
		    }
		    else {
		    	const oldValue = this.props.recipe.total.quantity;
		        const scalingFactor = value / oldValue;
		        scaledRecipe = this.scale(scalingFactor);
		    }
        }

        if (path[0] == 'ingredient') {
			const ingredients = scaledRecipe.ingredients.map((ingredient) => {

				return Object.assign({}, ingredient);
			});
			ingredients[index].amount = input.value;
			scaledRecipe.ingredients = ingredients;
		}
		else {
			const total = Object.assign({}, this.state.total);
			total.quantity = input.value;
			scaledRecipe.total = total;
		}

		this.setState(scaledRecipe);
	}

	handleUnitChange(event) {
		const input = event.target;
        const value = input.value;
        const name = input.name;

        const path = name.split('_');

        const index = path[2];

        const oldValue = this.props.recipe.ingredients[index].unit;

		const scalingFactor = convert(1).from(value).to(oldValue);

		this.scaleUnit(scalingFactor, index, value);
		
	}

	handleTotalUnitChange(event) {
		const input = event.target;
        const value = input.value;
        const name = input.name;

        const oldValue = this.props.recipe.total.unit;

		const scalingFactor = convert(1).from(value).to(oldValue);

    	const scaledIngredients = this.props.recipe.ingredients.map((ingredient, index) => {
	        const ingredientCopy = Object.assign({}, ingredient);

	        ingredientCopy.amount = scalingFactor * ingredientCopy.amount;

	        return ingredientCopy;
	    });

	    const total = Object.assign({}, this.state.total);
        total.unit = value;

    	this.setState({
        	ingredients: scaledIngredients,
        	total
        });

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
					    {index === 0 ? <label htmlFor={`ingredient_amount_${index}`}>Quantity</label> : ''}
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
						{index === 0 ? <label htmlFor={`ingredient_unit_${index}`}>Unit</label> : ''}
						<select
							value={ingredient.unit}
							className="form-control" 
							id={`ingredient_unit_${index}`}
						  name={`ingredient_unit_${index}`}
						  onChange={this.handleUnitChange}>
							  <option value=""></option>
							  <option value="smidgen">smidgen</option>
							  <option value="pinch">pinch</option>
							  <option value="dash">dash</option>
							  <option value="tad">tad</option>
							  <option value="tsp">tsp</option>
							  <option value="Tbs">Tbs</option>
							  <option value="fl-oz">fl-oz</option>
							  <option value="cup">cups</option>
							  <option value="pnt">pints</option>
							  <option value="qt">quarts</option>
							  <option value="gal">gallons</option>
							  <option value="lb">lb</option>
							  <option value="l">litres</option>
							  <option value="ml">millilitres</option>
							  <option value="g">grams</option>
							  <option value="mg">milligrams</option>
							  <option value="kg">kilograms</option>
						</select>
					</div>
					<div className="form-group col-5">
					    {index === 0 ? <label htmlFor={`ingredient_name_${index}`}>Name</label> : ''}
					    <input
					 			readOnly
						    className="form-control"
						    id={`ingredient_name_${index}`}
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
						<label htmlFor="exampleFormControlSelect1">Unit</label>
						<select
							value={total.unit}
							className="form-control" 
							id={`total_unit`}
						    name={`total_unit`}
						    onChange={this.handleTotalUnitChange}>
						  <option value=""></option>
						  <option value="">servings</option>
						  <option value="smidgen">smidgen</option>
						  <option value="pinch">pinch</option>
						  <option value="dash">dash</option>
						  <option value="tad">tad</option>
						  <option value="tsp">tsp</option>
						  <option value="Tbs">Tbs</option>
						  <option value="fl-oz">fl-oz</option>
						  <option value="cup">cups</option>
						  <option value="pnt">pints</option>
						  <option value="qt">quarts</option>
						  <option value="gal">gallons</option>
						  <option value="lb">lb</option>
						  <option value="l">litres</option>
						  <option value="ml">millilitres</option>
						  <option value="g">grams</option>
						  <option value="mg">milligrams</option>
						  <option value="kg">kilograms</option>
						</select>
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
