import { RSVP } from "../models/guest";
import GuestList from "../models/guest-list";
import party from "../services/party";

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
    party.rsvpGuest(rsvp);
}