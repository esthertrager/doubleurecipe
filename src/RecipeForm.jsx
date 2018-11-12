import React from 'react';

class RecipeForm extends React.Component {
	constructor(props) {
      super(props);
      this.state = Object.assign({}, props.recipe);
      this.handleInputChange = this.handleInputChange.bind(this);

    }

    componentWillReceiveProps(nextProps) {
    	const oldRecipe = this.state;
    	const newRecipe = nextProps.recipe;
    	for (let i = 0; i < oldRecipe.ingredients.length; i++) {
    		if (parseFloat(oldRecipe.ingredients[i].amount) !== parseFloat(newRecipe.ingredients[i].amount)) {
    			this.setState(newRecipe);
    			
    			return;
    		}
    	}
	}

	handleInputChange(event) {
		const input = event.target;
        const value = input.value;
        const name = input.name;

        const path = name.split('_');

        const index = path[2];
		if (path[0] == 'ingredient') {
			const ingredients = this.state.ingredients.map((ingredient) => {

				return Object.assign({}, ingredient);
			});
			ingredients[index].amount = value;
			this.setState({
				ingredients
			});
		}
		else {
			const total = Object.assign({}, this.state.total);
			total.quantity = value;
			this.setState({ total });
		}

	  	this.props.handleInputChange(event)
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
						  onChange={this.props.handleUnitChange}>
							  <option value=""></option>
							  <option value="serving">serving</option>
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
						    onChange={this.props.handleTotalUnitChange}>
						  <option value=""></option>
						  <option value="serving">serving</option>
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
					    onChange={this.props.handleInputChange}
					    placeholder="Directions"
					    value={this.state.directions || ''} />
				  </div>
				  <button className="btn">View</button>
				</form>
			</div>
	  	);
  }
}

export default RecipeForm;
