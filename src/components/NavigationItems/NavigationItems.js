import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
            Home
        </NavigationItem>
        
            <NavigationItem link="/questions">Questions</NavigationItem>
        {props.isLoggedIn ? (
            <NavigationItem link="/question">Ask</NavigationItem>
        ) : null}
       {!props.isLoggedIn ? (
           <NavigationItem link="/login">Log in</NavigationItem>
       ) : (
           <NavigationItem link="/logout">Logout</NavigationItem>
       )}
    </ul>
);

export default navigationItems;
