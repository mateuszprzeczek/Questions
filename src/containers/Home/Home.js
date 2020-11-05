import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Home.module.css'

const Home = (props) => (
    <div className={classes.Home}>
        <h1>Ask a question!</h1>
        <h2>click <NavLink to={props.isAuth ? "/question" : "/login"}exact>here</NavLink> to ask a question or <NavLink to="/questions"exact>here</NavLink> to answer others' questions</h2>
    </div>
)

const mapStateToProps = (state) => {
    return {
        isAuth: state.token !== null,
    }
}

export default connect(mapStateToProps) (Home);