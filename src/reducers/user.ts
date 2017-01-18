import {
  PARTY_ERROR,
  PartyErrorAction,
  RSVP_SUCCESS,
  RSVPSuccessAction,
  SET_PARTY,
  SetPartyAction
} from "../actions/party";
import {
  SET_EMAIL,
  SET_NAME,
  SET_USER,
  SetEmailAction,
  SetNameAction,
  SetUserAction
} from "../actions/user";
import GuestList from "../models/guest-list";

export type UserState = {
  user: firebase.User;
  name: string;
  email: string;
  emailHash: string;
  party: GuestList;
  partyError: Error;
  rsvpSuccess: boolean;
};

const USER_INITIAL: UserState = {
  user: undefined,
  name: undefined,
  email: undefined,
  emailHash: undefined,
  party: undefined,
  partyError: undefined,
  rsvpSuccess: false,
};

export type UserAction = SetUserAction | SetPartyAction | PartyErrorAction | SetEmailAction | SetNameAction | RSVPSuccessAction | { type: "" };

export function user(state: UserState = USER_INITIAL, action: UserAction) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case SET_EMAIL:
      return { ...state, email: action.email, emailHash: action.emailHash };
    case SET_NAME:
    return { ...state, name: action.name};
    case SET_PARTY:
      return { ...state, party: action.party, partyError: undefined  };
    case PARTY_ERROR:
      return { ...state, rsvpSuccess: false, partyError: action.error };
    case RSVP_SUCCESS:
      return { ...state, rsvpSuccess: true, partyError: undefined };
    default:
      return state;
  }
}