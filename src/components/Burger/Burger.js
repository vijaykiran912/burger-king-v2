import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const transforedIngredients = Object.keys(props.ingredients)
                    .map(igKey => {
                        return [...Array(props.ingredients[igKey])].map((_, i) => (
                            <BurgerIngredient key={igKey+i} type={igKey}/>
                        ));
                    });

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transforedIngredients }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;