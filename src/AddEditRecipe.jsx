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
			const amountInputName = `ingredient_amount_${index}`;
			const unitInputName = `ingredient_unit_${index}`;
			return (
				<div className="form-row form-group" key={index}>
					<div className="form-group col-3">
					    {index === 0 ? <label htmlFor={amountInputName}>Quantity</label> : ''}
					    <input
						    className="form-control"
						    id={amountInputName}
						    name={amountInputName}
						    onChange={this.handleInputChange}
						    placeholder="Quantity"
						    type="text"
						    value={ingredient.amount || ''} />
					</div>
					<div className="form-group col-4" style={{zIndex:999, backgroundColor:'white'}}>
						{index === 0 ? <label>Unit</label> : ''}
					{this.renderUnitField(ingredient.unit, unitInputName)}
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

	renderUnitField(unitValue, inputName) {
		return (
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
				        value={unitValue}
				        inputProps={{
				        	className: 'form-control'
				        }}
				        onChange={e => this.handleInputChange(e.target.value, inputName)}
				        onSelect={(value, item) => this.handleInputChange(value, inputName)}
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
								  border: '1px solid #cccccc',
								  zIndex:9999,
								  backgroundColor: 'white'
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
				)
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
					    <label htmlFor="total_quantity">Quantity</label>
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
					  	<label htmlFor="total_unit">Unit</label>
					  	{this.renderUnitField(total.unit, 'total_unit')}
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
