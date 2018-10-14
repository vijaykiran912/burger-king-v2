import React, {Component} from 'react';
import Aux from '../../hoc/Auxilary';

class BurgerBuilder extends Component{

    render(){
        return(
            <Aux>
                <div>Burger</div> 
                <div>BuildControls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;