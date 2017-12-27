import React from 'react';
import ReactAutocomplete from 'react-autocomplete';

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

	handleInputChange(value, name) {

        const path = name.split('_');

        if (path[0] === 'ingredient') {
        	this.updateIngredient(path[1], value, path[2]);
        } else if (path[0] === 'total') {
        	this.updateTotal(path[1], value);
        } else {
        	this.setState({
		        [name]: value
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
			if (!ingredient) {
				return;
			}
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
						    value={ingredient.amount || ''} />
					</div>

					<div className="form-group col-4">
						{index === 0 ? <label htmlFor={`ingredient_unit_${index}`}>Unit</label> : ''}
					<ReactAutocomplete
				        items={[
				          { id: '', label: '' },
						  { id: 'smidgen', label: 'smidgen' },
						  { id: 'pinch', label: 'pinch' },
						  { id: 'dash', label: 'dash' },
						  { id: 'tad', label: 'tad' },
						  { id: 'tsp', label: 'tsp' },
						  { id: 'Tbs', label: 'Tbs' },
						  { id: 'fl-oz', label: 'fl-oz' },
						  { id: 'cup', label: 'cups' },
						  { id: 'pnt', label: 'pints' },
						  { id: 'qt', label: 'quarts' },
						  { id: 'gal', label: 'gallons' },
						  { id: 'lb', label: 'lb' },
						  { id: 'l', label: 'litres' },
						  { id: 'ml', label: 'millilitres' },
						  { id: 'g', label: 'grams' },
						  { id: 'mg', label: 'milligrams' },
						  { id: 'kg', label: 'kilograms' },
				        ]}
				        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
				        getItemValue={item => item.label}
				        value={ingredient.unit}
				        inputProps={{
				        	className: 'form-control'
				        }}
				        onChange={e => this.handleInputChange(e.target.value, `ingredient_unit_${index}`)}
				        onSelect={(value, item) => this.handleInputChange(value, `ingredient_unit_${index}`)}
				        wrapperStyle={{
				        	position: 'relative'
				        }}
				        renderMenu={children => (
				            <div 
				            className="menu"
				            style={{
								  position: 'absolute',
								  boxSizing: 'border-box',
								  width: '100%',
								  border: '1px solid #cccccc'
								}}>
				              {children}
				            </div>
				        )}
						renderItem={(item, isHighlighted) => (
							<div
							  className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
							  style={{
								  padding: '2px 6px',
								  cursor: 'default',
								  color: `${isHighlighted ? 'white' : 'inherit'}`,
								  backgroundColor: `${isHighlighted ? '#4095bf' : 'inherit'}`
								}}
							  key={item.id}
							>{item.label}</div>
						)}
				    />
					</div>
					<div className="form-group col-5">
					    {index === 0 ? <label htmlFor={`ingredient_name_${index}`}>Name</label> : ''}
					    <input
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
	  			<h3>Add Recipe</h3>
		  		<form>
				  <div className="form-group">
				    <label htmlFor="name">Recipe Name</label>
				    <input
					    className="form-control"
					    id="name"
					    name="name"
					    // this is equivalent to onChange={(e) => this.handleInputChange(e)}
					    onChange={this.handleInputChange}
					    placeholder="Recipe Name"
					    type="text"
					    value={this.state.name} />
				  </div>
				  <div className="row">
				  	<div className="col-12">
				  		<h4>Ingredients</h4>
				  		
				  	</div>
				  </div>
				  {this.renderIngredients()}
				  <button
				  			className="btn"
				  			onClick={(event) => this.onClickAddIngredient(event)}>+ Add Ingredient</button>
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
						    onChange={this.handleInputChange}>
						  <option value=""></option>
						  <option value="servings">servings</option>
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
				    <textarea
					    className="form-control"
					    id="directions"
					    name="directions"
					    rows="5"
					    onChange={this.handleInputChange}
					    placeholder="Directions"
					    value={this.state.directions || ''} />
				  </div>
				  <button
				  	className="btn"
				  	onClick={(event) => this.props.onClickSaveRecipe(event, this.state)}>Save Recipe</button>
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
