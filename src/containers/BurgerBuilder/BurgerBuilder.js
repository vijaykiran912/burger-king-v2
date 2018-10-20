import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        purchacing : false,
        loading : false
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

    purchaseContinueHandler = () => {
        this.setState({
            loading : true
        })
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.price,
            customer : {
                name : 'Vijay Pothamsetty',
                address : {
                    street : 'Bandirev',
                    zipCode : '533261',
                    country : 'India'
                },
                email : 'v25081989@gmail.com',
                deliveryMethod : 'fastest'
            }
        }
        axios.post('/orders.json', order)
             .then(response => {
                this.setState({
                    loading : false,
                    purchacing : false
                })
             }).catch(error => {
                this.setState({
                    loading : false,
                    purchacing : false
                })
             })
    }

    render() {

        const disableInfo = {...this.state.ingredients};
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = (<OrderSummary 
            ingredients= {this.state.ingredients}
            purchaseCancled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler} 
            price={this.state.totalPrice}/>);
        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchacing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
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