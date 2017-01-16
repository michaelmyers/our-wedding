import userService from "../services/user";

export type SET_USER = "SET_USER";
export const SET_USER: SET_USER = "SET_USER";

export type SetUserAction = {
    type: SET_USER;
    user: firebase.User;
};

export function setUser(user: firebase.User) {
    return function (dispatch: Redux.Dispatch<void>) {
        dispatch({ type: SET_USER, user: user });
        userService.getEmail().then(function (email) {
            dispatch({ type: SET_EMAIL, email: email.email, emailHash: email.emailHash });
        });
    };
}

export type SET_EMAIL = "SET_EMAIL";
export const SET_EMAIL: SET_EMAIL = "SET_EMAIL";

export type SetEmailAction = {
    type: SET_EMAIL;
    email: string;
    emailHash: string;
};

export function setEmail(email: string) {
    return function (dispatch: Redux.Dispatch<void>) {
        userService.setEmail(email).then(function (email) {
            dispatch({ type: SET_EMAIL, email: email.email, emailHash: email.emailHash });
        });
    };
}

export type SET_NAME = "SET_NAME";
export const SET_NAME: SET_NAME = "SET_NAME";

export type SetNameAction = {
    type: SET_NAME;
    name: string;
};

export function setName(name: string) {
    return {
        type: SET_NAME,
        name
    };
}
