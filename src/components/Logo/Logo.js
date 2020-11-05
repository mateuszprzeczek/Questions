import React from "react";

import logoIcon from "../../assets/images/questionmark.jpg";
import classes from "./Logo.module.css"

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={logoIcon} alt="QuestionMark"  onClick={props.clicked}/>
    </div>
);

export default logo;