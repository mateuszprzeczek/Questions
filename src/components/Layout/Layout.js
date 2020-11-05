import React, { useState } from 'react'
import { connect } from 'react-redux'

import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../Toolbar/SideDrawer/SideDrawer'

import classes from './Layout.module.css'

const Layout = (props) => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };
    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

    return (
        <React.Fragment>
            <Toolbar isLoggedIn={props.isLoggedIn} drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isLoggedIn={props.isLoggedIn}
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler}
                clicked={sideDrawerToggleHandler}
            />
            <main className={classes.Content}>{props.children}</main>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);