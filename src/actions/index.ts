import { RSVP } from "../models/guest";
import GuestList from "../models/guest-list";
import { RegistrationStatus } from "../models/registration";
import party from "../services/party";
import userService from "../services/user";

export type RACE_REGISTRATION_REQUEST = "RACE_REGISTRATION_REQUEST";
export const RACE_REGISTRATION_REQUEST: RACE_REGISTRATION_REQUEST = "RACE_REGISTRATION_REQUEST";

export type RACE_REGISTRATION_SUCCESS = "RACE_REGISTRATION_SUCCESS";
export const RACE_REGISTRATION_SUCCESS: RACE_REGISTRATION_SUCCESS = "RACE_REGISTRATION_SUCCESS";

export type RACE_REGISTRATION_OUTCOME = "RACE_REGISTRATION_OUTCOME";
export const RACE_REGISTRATION_OUTCOME: RACE_REGISTRATION_OUTCOME = "RACE_REGISTRATION_OUTCOME";

export type RaceRegistrationRequestAction = {
    type: RACE_REGISTRATION_REQUEST;
    name: string;
    email: string;
};

export type RaceRegistractionSuccessAction = {
    type: RACE_REGISTRATION_SUCCESS;
};

export type RaceRegistractionOutcomeAction = {
    type: RACE_REGISTRATION_OUTCOME;
    status: RegistrationStatus;
};

export function register(name: string, email: string) {
    console.log("register " + name + " " + email);
}

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

export type SET_PARTY = "SET_PARTY";
export const SET_PARTY: SET_PARTY = "SET_PARTY";

export type SetPartyAction = {
    type: SET_PARTY,
    party: GuestList
};

export function setParty(party: GuestList): SetPartyAction {
    return {
        type: SET_PARTY,
        party: party
    };
}

export type PARTY_ERROR = "PARTY_ERROR";
export const PARTY_ERROR: PARTY_ERROR = "PARTY_ERROR";

export type PartyErrorAction = {
    type: PARTY_ERROR,
    error: Error;
};

export function partyError(error: Error): PartyErrorAction {
    return {
        type: PARTY_ERROR,
        error: error
    };
}

export function getParty() {
    return function (dispatch: Redux.Dispatch<void>) {
        party.getParty().then(function (guests) {
            dispatch(setParty(guests));
        }).catch(function (error) {
            dispatch(partyError(error));
        });
    };
}

export function rsvpGuest(rsvp: RSVP) {
    console.log(rsvp.fullName + " " + rsvp.status);
    party.rsvpGuest(rsvp);
}
