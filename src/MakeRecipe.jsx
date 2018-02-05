import React from 'react';
import convert from 'recipe-unit-converter';
import clone from 'clone';

class MakeRecipe extends React.Component {
	constructor(props) {
      super(props);
      const ingredients = props.recipe.ingredients.map((ingredient) => {
      	return Object.assign({}, ingredient, {
      		checked: false
      	});
      });
      this.state = Object.assign({}, props.recipe, {
      	ingredients
      });
    }

    handleCheckChange(event, index) {
    	const recipe = clone(this.state);

    	recipe.ingredients[index].checked = event.target.checked;

    	this.setState(recipe);
    }

    handleIngredientChange(inputAmount, unit, index) {
     	const amount = parseFloat(inputAmount);
        let scaledRecipe = Object.assign({}, this.state);
        let newAmount;
        if (!isNaN(amount) && amount > 0) {
        	const oldValue = this.props.recipe.ingredients[index].amount;
		    const amountScalingFactor = amount / oldValue;
		    const unitScalingFactor = convert(1).from(this.props.recipe.ingredients[index].unit).to(unit);
		    newAmount = unitScalingFactor * this.props.recipe.ingredients[index].amount;
		    newAmount = +newAmount.toFixed(2);
        }

        const ingredients = scaledRecipe.ingredients.map((ingredient) => {
			return Object.assign({}, ingredient);
		});

		ingredients[index].amount = newAmount;
		ingredients[index].unit = unit;
		scaledRecipe.ingredients = ingredients;

		this.setState(scaledRecipe);
	}

	handleTotalChange(inputAmount, unit) {
     	const amount = parseFloat(inputAmount);
        let scaledRecipe = Object.assign({}, this.state);
        let newAmount;

        if (!isNaN(amount) && amount > 0) {
        	const oldValue = this.props.recipe.total.quantity;
		    const amountScalingFactor = amount / oldValue;
		    const unitScalingFactor = convert(1).from(this.props.recipe.total.unit).to(unit);
		    newAmount = unitScalingFactor * this.props.recipe.total.quantity;
		    newAmount = +newAmount.toFixed(2);
		    
        }

		const total = {
			quantity: newAmount,
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
			if (!ingredient || this.state.ingredients[index].checked) {
				return null;
			}
			return (
				<div className="form-row form-group" key={index}>
					<div className="form-check">
					  <input className="form-check-input position-static" 
					  		type="checkbox" 
					  		id="blankCheckbox" 
					  		value="option1" 
					  		onChange={(event) => this.handleCheckChange(event, index)} />
					</div>
					<div className="form-group col-3">
					    {index === 0 ? <label htmlFor={`ingredient_amount_${index}`}>Quantity</label> : ''}
					    <input readOnly
						    className="form-control"
						    id={`ingredient_amount_${index}`}
						    name={`ingredient_amount_${index}`}
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
					    <input readOnly
						    className="form-control"
						    id="total_quantity"
						    name="total_quantity"
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
			</div>
	  	); 	
    }
}



export default MakeRecipe;
