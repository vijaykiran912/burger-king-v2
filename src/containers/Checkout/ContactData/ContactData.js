import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {},
                isValid: true,
                value: 'cheapest'
            }
        },
        isFormValid : false,
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const formData = {};
        for (let inputIdentifier in this.state.orderForm) {
            formData[inputIdentifier] = this.state.orderForm[inputIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                })
                this.props.history.push('/');
            }).catch(error => {
                this.setState({
                    loading: false
                })
            })
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.minLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...this.state.orderForm[inputIdentifier] }
        updatedFormElement.value = event.target.value;
        updatedFormElement.isValid = this.checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;
        for(let inputIdentifier in this.state.orderForm){
            isFormValid = updatedOrderForm[inputIdentifier].isValid && isFormValid;
        }
         
        this.setState({
            orderForm: updatedOrderForm,
            isFormValid
        })
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => {
                return (<Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    invalid={!formElement.config.isValid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    value={formElement.config.value} changed={(event) => this.inputChangedHandler(event, formElement.id)} />);
            })

            }
            <Button disabled={!this.state.isFormValid} btnType="Success">ORDER</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;