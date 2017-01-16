import { RegistrationStatus } from "../models/registration";
import race from "../services/race";

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
    return function (dispatch: Redux.Dispatch<void>) {
        race.register(name, email).then(function (status) {
            dispatch({ type: RACE_REGISTRATION_OUTCOME, status: status });
        });
    };
}