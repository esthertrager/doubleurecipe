'use strict';
import React from 'react';
import convert from 'recipe-unit-converter';
import MakeRecipe from './MakeRecipe';
import { Link } from 'react-router-dom';

class ScaleRecipe extends React.Component {
	constructor(props) {
      super(props);
      this.state = Object.assign({}, props.recipe);
      this.handleIngredientChange = this.handleIngredientChange.bind(this);
      this.handleTotalChange = this.handleTotalChange.bind(this);
    }

    scale(scalingFactor) {
    	const scaledIngredients = this.props.recipe.ingredients.map((ingredient, index) => {
        const ingredientCopy = Object.assign({}, ingredient);
        	ingredientCopy.amount = scalingFactor * parseFloat(ingredientCopy.amount);

        	if (this.props.recipe.ingredients[index].unit !== this.state.ingredients[index].unit) {
        		const unitScalingFactor = convert(1).from(this.props.recipe.ingredients[index].unit).to(this.state.ingredients[index].unit);
        		ingredientCopy.amount = unitScalingFactor * parseFloat(ingredientCopy.amount);
        		ingredientCopy.unit = this.state.ingredients[index].unit;
        	}

        ingredientCopy.amount = +ingredientCopy.amount.toFixed(2);
        	
        	return ingredientCopy;
        });

        const scaledTotal = Object.assign({}, this.props.recipe.total);
        scaledTotal.quantity = scaledTotal.quantity * parseFloat(scalingFactor);

		if (this.props.recipe.total.unit !== this.state.total.unit) {
    		const unitScalingFactor = convert(1).from(this.props.recipe.total.unit).to(this.state.total.unit);
    		scaledTotal.quantity = unitScalingFactor * parseFloat(scaledTotal.quantity);
    		scaledTotal.unit = this.state.total.unit;
    	}

        scaledTotal.quantity = +scaledTotal.quantity.toFixed(2);

        return {
        	ingredients: scaledIngredients,
        	total: scaledTotal
        };
    }

	handleIngredientChange(inputAmount, unit, index) {
     	const amount = parseFloat(inputAmount);
        let scaledRecipe = Object.assign({}, this.state);

        if (!isNaN(amount) && amount > 0) {
        	const oldValue = this.props.recipe.ingredients[index].amount;
		    const amountScalingFactor = amount / oldValue;
		    const unitScalingFactor = convert(1).from(unit).to(this.props.recipe.ingredients[index].unit);

		    scaledRecipe = this.scale(amountScalingFactor * unitScalingFactor);
        }

        const ingredients = scaledRecipe.ingredients.map((ingredient) => {
			return Object.assign({}, ingredient);
		});

		ingredients[index].amount = inputAmount;
		ingredients[index].unit = unit;
		scaledRecipe.ingredients = ingredients;

		this.setState(scaledRecipe);
	}

	handleTotalChange(inputAmount, unit) {
     	const amount = parseFloat(inputAmount);
        let scaledRecipe = Object.assign({}, this.state);

        if (!isNaN(amount) && amount > 0) {
        	const oldValue = this.props.recipe.total.quantity;
		    const amountScalingFactor = amount / oldValue;
		    const unitScalingFactor = convert(1).from(unit).to(this.props.recipe.total.unit);

		    scaledRecipe = this.scale(amountScalingFactor * unitScalingFactor);
        }

		const total = {
			quantity: inputAmount,
			unit: unit
		};

		scaledRecipe.total = total;

		this.setState(scaledRecipe);
	}

	renderOptions(value, amount) {
		const allUnitPossibilities = convert().possibilities();

		if (allUnitPossibilities.indexOf(value) === -1) {
			return (
				<option>{value}</option>
			);
		}
		
		const nounType = parseInt(amount) === 1 ? 'singular' : 'plural';
		const unitDescription = convert().describe(value);
		const unitType = unitDescription.measure;
		const unitPossibilities = convert().possibilities(unitType);
		return unitPossibilities.map((unit) => {
			const unitDescribe = convert().describe(unit);
			
			return (
				<option key={unit} value={unit}>{unitDescribe[nounType]}</option>
			)
		});
	}

	renderIngredients() {
		return this.state.ingredients.map((ingredient, index) => {
			if (!ingredient) {
				return null;
			}
			return (
				<div className="form-row form-group" key={index}>
					<div className="form-group col-3">
					    {index === 0 ? <label htmlFor={`ingredient_amount_${index}`}>Quantity</label> : ''}
					    <input
						    className="form-control"
						    id={`ingredient_amount_${index}`}
						    name={`ingredient_amount_${index}`}
						    onChange={(e) => this.handleIngredientChange(e.target.value, ingredient.unit, index)}
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
						  	onChange={(e) => this.handleIngredientChange(ingredient.amount, e.target.value, index)} >
						  	{this.renderOptions(ingredient.unit, ingredient.amount)}

							  
							  
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
						    onChange={(e) => this.handleTotalChange(e.target.value, total.unit)}
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
						    onChange={(e) => this.handleTotalChange(total.quantity, e.target.value)}>
						  {this.renderOptions(total.unit, total.quantity)}
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
					    onChange={this.handleIngredientChange}
					    placeholder="Directions"
					    value={this.state.directions || ''} />
				  </div>
				</form>
				<Link to={`/recipes/${this.props.recipe.id}/make`} onClick={()=> { console.log(this.state); sessionStorage.setItem('stateRecipe', JSON.stringify(this.state))}} className="btn btn-primary">Make It</Link>
			</div>
	  	); 	
    }
}

export default ScaleRecipe;
