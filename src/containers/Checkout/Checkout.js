import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price : 0
    }

    checkoutCancledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        let price = 0;
        const ingredients = {};
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = +param[1];
            }
            else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredients,
            price : price
        })
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancled={this.checkoutCancledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients} />
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData 
                                    price={this.state.price}
                                    ingredients={this.state.ingredients} {...props}/>)} />
            </div>
        )
    }
}

export default Checkout;
