import React from 'react';
import classes from './Order.css';

const order = (props) => {
    
    const ingredients = [];
    for(let ig in props.ingredients){
        ingredients.push({
            amount : props.ingredients[ig],
            name : ig
        });
    }

    const ingredientString = ingredients.map(ig => {
        return (<span className={classes.Span} key={ig.name}>
           <strong>{ig.name}({ig.amount})</strong> 
        </span>)
    })

    return(
    <div className={classes.Order}>
        <p>Ingredients: {ingredientString} </p>
        <p>Price: <strong>USD: {props.price}</strong> </p>
    </div>
)}

export default order;