import React from 'react';
import classes from './DrawerToogle.css';

const toogleDrawer = (props) => {
    return (
        <div className={classes.DrawerToggle} onClick={props.drawerToogleClicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default toogleDrawer;