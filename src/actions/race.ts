import { Registration, RegistrationStatus } from "../models/registration";
import race from "../services/race";

export type RACE_REGISTRATION_OUTCOME = "RACE_REGISTRATION_OUTCOME";
export const RACE_REGISTRATION_OUTCOME: RACE_REGISTRATION_OUTCOME = "RACE_REGISTRATION_OUTCOME";

export type RaceRegistractionOutcomeAction = {
    type: RACE_REGISTRATION_OUTCOME;
    status: RegistrationStatus;
};

export function register(registration: Registration) {
    return function (dispatch: Redux.Dispatch<void>) {
        race.register(registration).then(function (status) {
            dispatch({ type: RACE_REGISTRATION_OUTCOME, status: status });
        });
    };
}

export type SET_RACE_REGISTRATION = "SET_RACE_REGISTRATION";
export const SET_RACE_REGISTRATION: SET_RACE_REGISTRATION = "SET_RACE_REGISTRATION";

export type SetRaceRegistrationAction = {
    type: SET_RACE_REGISTRATION,
    registration: Registration
};

export function getRegistration() {
    return function (dispatch: Redux.Dispatch<void>) {
        race.getRegistration().then(function (registration) {
            dispatch({ type: SET_RACE_REGISTRATION, registration });
        });
    };
}