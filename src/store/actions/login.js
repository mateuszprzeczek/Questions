import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (token, userId) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
        userId: userId
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('exporationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkLoginTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error,
    };
};

export const login = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(loginStart());
        const loginData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApn-P-llYIZAUa1Qbkdj2FjtvoTx0Fpis";
        if (isSignUp) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApn-P-llYIZAUa1Qbkdj2FjtvoTx0Fpis";
        }
        axios
            .post(url, loginData)
            .then((response) => {
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userId", response.data.localId);
                dispatch(
                    loginSuccess(response.data.idToken, response.data.localId)
                );
                dispatch(checkLoginTimeout(response.data.expiresIn));
            })
            .catch((err) => {
                dispatch(loginFail(err.response.data.error)); 
            });
    };
};

export const setLoginRedirectPath = (path) => {
    return {
        type: actionTypes.SET_LOGIN_REDIRECT_PATH,
        path: path,
    };
};

export const loginCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("userId");
                dispatch(loginSuccess(token, userId));
                dispatch(
                    checkLoginTimeout(
                        expirationDate.getTime() - new Date().getTime() * 1000
                    )
                );
            }
        }
    };
};
