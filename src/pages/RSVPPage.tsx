import * as React from "react";
import { connect } from "react-redux";
import { Button } from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";

import { getParty, rsvpGuest, setEmail } from "../actions";
import Guest, { RSVP } from "../models/guest";
import GuestList from "../models/guest-list";
import { State } from "../reducers";

import GuestRSVP from "../components/GuestRSVP";

interface RSVPPageProps {
    setEmail: (email: string) => (dispatch: Redux.Dispatch<any>) => void;
    getParty: () => (dispatch: Redux.Dispatch<any>) => void;
    rsvpGuest: (rsvp: RSVP) => void;
    user: firebase.User;
    email: string;
    emailHash: string;
    party: GuestList;
    error: Error;
}

interface RSVPPageState {
    party: GuestList;
    rsvps: { [guestId: string]: RSVP };
    email: string;
}

function mapStateToProps(state: State) {
    return {
        user: state.user.user,
        email: state.user.email,
        emailHash: state.user.emailHash,
        party: state.user.party,
        error: state.user.partyError
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>) {
    return {
        setEmail: function (email: string) {
            return dispatch(setEmail(email));
        },
        getParty: function () {
            return dispatch(getParty());
        },
        rsvpGuest: function (rsvp: RSVP) {
            rsvpGuest(rsvp);
        }
    };
}

export class RSVPPage extends React.Component<RSVPPageProps, RSVPPageState> {

    constructor(props: RSVPPageProps) {
        super(props);
        console.log("RSVP constructor");
        console.log(props);
        if (props.email) {
            // If we already have an email, get the party
            this.props.getParty();
        }
        // if we don't have
        this.state = {
            party: props.party,
            email: "",
            rsvps: {}
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSetEmail = this.handleSetEmail.bind(this);
        this.onRSVPChange = this.onRSVPChange.bind(this);
        this.handleRSVP = this.handleRSVP.bind(this);
    }

    componentWillReceiveProps(nextProps: RSVPPageProps) {
        console.log("RSVP willReceiveProps");
        console.log(nextProps);
        if (!this.state.party && !nextProps.error) {
            // if no party, try to get one
            this.props.getParty();
        }

        if (nextProps.party) {
            this.state.party = nextProps.party;
            this.setState(this.state);
        }
    }

    handleEmailChange(email: string) {
        this.setState({ ...this.state, email: email });
    }

    handleSetEmail() {
        this.props.setEmail(this.state.email);
    }

    handleRSVP() {
        console.log("RSVPPage RSVP");
        for (let id in this.state.rsvps) {
            this.props.rsvpGuest(this.state.rsvps[id]);
        }
    }

    onRSVPChange(guest: Guest, rsvp: RSVP) {
        console.log("updating RSVP ");
        console.log(rsvp);
        this.state.rsvps[guest.id] = rsvp;
    }

    render() {

        let party: JSX.Element[] = [];
        if (this.state.party) {
            for (let guest of this.state.party.guests) {
                party.push(
                    <li key={guest.id}>
                        <GuestRSVP guest={guest} onChange={this.onRSVPChange} />
                    </li>
                );
            }
        }

        return (
            <div>
                {this.props.error ? (
                    <p> {this.props.error.message}</p>
                ) : undefined}
                {this.props.party ? (
                    <span>
                        <ul>{party}</ul>
                        <Button raised onClick={this.handleRSVP}> RSVP </Button>
                    </span>
                ) : undefined}
                {this.props.user && !this.props.email ? (
                    <span>
                        <p> Please enter you email </p>
                        <Input type="email" label="Email" icon="email" value={this.state.email} onChange={this.handleEmailChange} />
                        <Button label="RSVP" onClick={this.handleSetEmail} raised primary />
                    </span>
                ) : undefined}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RSVPPage);