import { RACE_REGISTRATION_OUTCOME, RaceRegistractionOutcomeAction } from "../actions";
import { RegistrationStatus } from "../models/registration";

  export type RaceState = {
    status: RegistrationStatus;
  };

const RACE_INITIAL: RaceState = {
  status: undefined
};

export type RaceAction = RaceRegistractionOutcomeAction | { type: "" };

export function race(state: RaceState = RACE_INITIAL, action: RaceAction) {
  switch (action.type) {
    case RACE_REGISTRATION_OUTCOME:
      return { ...state, status: action.status };
    default:
      return state;
  }
}