import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 0.3,
    meat: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchacing : false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice : newPrice,
            ingredients : updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceAddition;

        this.setState({
            totalPrice : newPrice,
            ingredients : updatedIngredients
        });
        
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients).map((igKey) => {
                return ingredients[igKey]
        }).reduce((sum, el) => {
               return sum = sum + el; 
        },0);

        this.setState({
            purchasable : sum>0
        });
    }

    purchaseHandler = () => {
        this.setState({
            purchacing : true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchacing : false
        })
    }

    render() {

        const disableInfo = {...this.state.ingredients};
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchacing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients= {this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;