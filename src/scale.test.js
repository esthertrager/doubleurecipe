import React from 'react';
import ScaleRecipe from './ScaleRecipe.jsx';
//import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const updateInput = (wrapper, instance, newValue) => {
    const input = wrapper.find(instance)
    input.simulate('change', {
        target: {value: newValue}
    })
    return wrapper.find(instance)
}

describe('Scale', () => {
	it('changing one ingredient scales the rest of the ingredients and total', () => {
		const recipe = {
		  "name": "Ice Cream",
	      "ingredients": [
	      {
	        "amount": "400",
	        "unit": "g",
	        "name": "peanut butter"
	      },
	      {
	        "amount": "400",
	        "unit": "g",
	        "name": "dark chocolate"
	      }],
	      "total": {
	      	"unit": "g",
	      	"quantity": "800"
	      },
	      "id": 2
		};

		const wrapper = shallow(<ScaleRecipe recipe={recipe} />);
		
		expect(wrapper.find('[id="ingredient_amount_0"]').props().value).toBe('400');
		expect(wrapper.find('[id="ingredient_amount_1"]').props().value).toBe('400');
		expect(wrapper.find('[id="total_quantity"]').props().value).toEqual('800');

		const amountInput = updateInput(wrapper, '[id="ingredient_amount_0"]', 800);
		
		expect(wrapper.find('[id="ingredient_amount_0"]').props().value).toBe(800);
		expect(wrapper.find('[id="ingredient_amount_1"]').props().value).toBe(800);
		expect(wrapper.find('[id="total_quantity"]').props().value).toBe(1600);		
	});
	it('changing the yield amount scales the ingredients', () => {
		const recipe = {
		  "name": "Ice Cream",
	      "ingredients": [
	      {
	        "amount": "400",
	        "unit": "g",
	        "name": "peanut butter"
	      },
	      {
	        "amount": "400",
	        "unit": "g",
	        "name": "dark chocolate"
	      }],
	      "total": {
	      	"unit": "g",
	      	"quantity": "800"
	      },
	      "id": 2
		};

		const wrapper = shallow(<ScaleRecipe recipe={recipe} />);
		
		expect(wrapper.find('[id="ingredient_amount_0"]').props().value).toBe('400');
		expect(wrapper.find('[id="ingredient_amount_1"]').props().value).toBe('400');
		expect(wrapper.find('[id="total_quantity"]').props().value).toEqual('800');

		const amountInput = updateInput(wrapper, '[id="total_quantity"]', 400);
		
		expect(wrapper.find('[id="ingredient_amount_0"]').props().value).toBe(200);
		expect(wrapper.find('[id="ingredient_amount_1"]').props().value).toBe(200);
		expect(wrapper.find('[id="total_quantity"]').props().value).toBe(400);		
	});
	it('changing an ingredient unit scales the ingredients and yield', () => {
		const recipe = {
		  "name": "Ice Cream",
	      "ingredients": [
	      {
	        "amount": "400",
	        "unit": "g",
	        "name": "peanut butter"
	      },
	      {
	        "amount": "400",
	        "unit": "g",
	        "name": "dark chocolate"
	      }],
	      "total": {
	      	"unit": "g",
	      	"quantity": "800"
	      },
	      "id": 2
		};

		const wrapper = shallow(<ScaleRecipe recipe={recipe} />);
		
		expect(wrapper.find('[id="ingredient_unit_0"]').props().value).toBe('g');
		expect(wrapper.find('[id="ingredient_unit_1"]').props().value).toBe('g');
		expect(wrapper.find('[id="total_unit"]').props().value).toEqual('g');

		const amountInput = updateInput(wrapper, '[id="ingredient_unit_0"]', 'kg');

		expect(wrapper.find('[id="ingredient_unit_0"]').props().value).toBe('kg');
		expect(wrapper.find('[id="ingredient_amount_0"]').props().value).toEqual('400');
		expect(wrapper.find('[id="ingredient_amount_1"]').props().value).toEqual(400000);
		expect(wrapper.find('[id="total_quantity"]').props().value).toEqual(800000);		
	});
	it('changing the yield unit scales the ingredient amounts', () => {
		const recipe = {
		  "name": "Ice Cream",
	      "ingredients": [
	      {
	        "amount": "400",
	        "unit": "g",
	        "name": "peanut butter"
	      },
	      {
	        "amount": "400",
	        "unit": "g",
	        "name": "dark chocolate"
	      }],
	      "total": {
	      	"unit": "g",
	      	"quantity": "800"
	      },
	      "id": 2
		};

		const wrapper = shallow(<ScaleRecipe recipe={recipe} />);
		
		expect(wrapper.find('[id="ingredient_amount_0"]').props().value).toBe('400');
		expect(wrapper.find('[id="ingredient_amount_1"]').props().value).toBe('400');
		expect(wrapper.find('[id="total_quantity"]').props().value).toEqual('800');

		const amountInput = updateInput(wrapper, '[id="total_unit"]', 'kg');
		
		expect(wrapper.find('[id="ingredient_amount_0"]').props().value).toBe(400000);
		expect(wrapper.find('[id="ingredient_amount_1"]').props().value).toBe(400000);
		expect(wrapper.find('[id="total_quantity"]').props().value).toBe('800');		
	});
});