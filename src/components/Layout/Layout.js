import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer : true});
    }

    sideDrawerToogleHandler = () => {
        this.setState((prevState) => {
            return  ({showSideDrawer : !prevState.showSideDrawer});
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar clicked={this.sideDrawerToogleHandler}/>
                <SideDrawer open = {this.state.showSideDrawer} closed={this.sideDrawerToogleHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;