import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    loginRedirectPath: "/",
};

const loginStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false,
    });
};

const loginFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const logout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setLoginRedirectPath = (state, action) => {
    return updateObject(state, { loginRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL:
            return loginFail(state, action);
        case actionTypes.LOGOUT:
            return logout(state, action);
        case actionTypes.SET_LOGIN_REDIRECT_PATH:
            return setLoginRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;
