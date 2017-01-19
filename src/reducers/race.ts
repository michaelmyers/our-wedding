import {
  RACE_REGISTRATION_OUTCOME,
  SET_RACE_REGISTRATION,
  RaceRegistractionOutcomeAction,
  SetRaceRegistrationAction
} from "../actions/race";
import { Registration, RegistrationStatus } from "../models/registration";

export type RaceState = {
  status: RegistrationStatus;
  registration: Registration;
};

const RACE_INITIAL: RaceState = {
  status: undefined,
  registration: undefined
};

export type RaceAction = SetRaceRegistrationAction | RaceRegistractionOutcomeAction | { type: "" };

export function race(state: RaceState = RACE_INITIAL, action: RaceAction) {
  switch (action.type) {
    case RACE_REGISTRATION_OUTCOME:
      return { ...state, status: action.status };
    case SET_RACE_REGISTRATION:
      return { ...state, registration: action.registration };
    default:
      return state;
  }
}