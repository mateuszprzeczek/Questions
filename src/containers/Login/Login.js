import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { updateObject } from "../../shared/utility";
import Input from '../../components/UI/Input/Input'
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from './Login.module.css'

import * as actions from "../../store/actions/index";


const Login = (props) => {
    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'input', 
            elementConfig: {
                type: 'email', 
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Password",
            },
            value: "",
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        },
    })

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const { loginRedirectPath, onSetLoginRedirectPath } = props;

    useEffect(() => {
        if (loginRedirectPath !== "/") {
            onSetLoginRedirectPath();
        }
    }, [loginRedirectPath, onSetLoginRedirectPath]);


    const checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length >= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    };

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(loginForm, {
            [controlName]: updateObject(loginForm[controlName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    loginForm[controlName].validation
                ),
                touched: true,
            }),
        });
        setLoginForm(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(loginForm.email.value, loginForm.password.value, isLoggedIn);
    };

    const guestLoginHandler = () => {
        props.onLogin('test@test.pl', 'password', isLoggedIn);
    }

    const switchLoginModeHandler = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    const formElementsArray = [];
    for (let key in loginForm) {
        formElementsArray.push({
            id: key,
            config: loginForm[key],
        });
    }

    let form = formElementsArray.map((el) => (
        <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
            valueType={el.id}
            changed={(event) => inputChangedHandler(event, el.id)}
        />
    ));

    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
    }

    let loginRedirect = null;
    if (props.isAuth) {
        loginRedirect = <Redirect to={props.loginRedirectPath} />;
    }

    return (
        <div className={classes.Login}>
            {loginRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button clicked={switchLoginModeHandler} btnType="Danger">
                {isLoggedIn ? "Don't have an account yet? Sign Up" : "Already Registered? login"}
            </Button>
            <Button btnType="Success" clicked={guestLoginHandler}>
            LOG IN AS A GUEST
            </Button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        isAuth: state.token !== null,
        loginRedirectPath: state.authRedirectPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password, nickName, isSignUp) =>
            dispatch(actions.login(email, password, nickName, isSignUp)),
        onSetLoginRedirectPath: () => dispatch(actions.setLoginRedirectPath("/")),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
