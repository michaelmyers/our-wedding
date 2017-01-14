import {
  PARTY_ERROR,
  PartyErrorAction,
  SET_EMAIL,
  SET_PARTY,
  SET_USER,
  SetEmailAction,
  SetPartyAction,
  SetUserAction
} from "../actions";
import GuestList from "../models/guest-list";

export type UserState = {
  user: firebase.User;
  email: string;
  emailHash: string;
  party: GuestList;
  partyError: Error;
};

const USER_INITIAL: UserState = {
  user: undefined,
  email: undefined,
  emailHash: undefined,
  party: undefined,
  partyError: undefined
};

export type UserAction = SetUserAction | SetPartyAction | PartyErrorAction | SetEmailAction | { type: "" };

export function user(state: UserState = USER_INITIAL, action: UserAction) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case SET_EMAIL:
      return { ...state, email: action.email, emailHash: action.emailHash };
    case SET_PARTY:
      return { ...state, party: action.party };
    case PARTY_ERROR:
      return { ...state, partyError: action.error };
    default:
      return state;
  }
}