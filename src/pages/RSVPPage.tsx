import * as React from "react";
import { connect } from "react-redux";
import { Button } from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";

import { getParty, setEmail } from "../actions";
import GuestList from "../models/guest-list";
import { State } from "../reducers";

interface RSVPPageProps {
    setEmail: (email: string) => (dispatch: Redux.Dispatch<any>) => void;
    getParty: () => (dispatch: Redux.Dispatch<any>) => void;
    user: firebase.User;
    email: string;
    emailHash: string;
    party: GuestList;
    error: Error;
}

interface RSVPPageState {
    party: GuestList;
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
            email: ""
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSetEmail = this.handleSetEmail.bind(this);
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

    render() {

        let party: JSX.Element[] = [];
        if (this.state.party) {
            for (let guest of this.state.party.guests) {
                party.push(<li key={guest.id}> {guest.fullName} </li>);
            }
        }

        return (
            <div>
                {this.props.error ? (
                    <p> {this.props.error.message}</p>
                ) : undefined}
                {this.props.party ? (
                    <ul>{party}</ul>
                ) : (
                        <span>
                            <p> Please enter you email </p>
                            <Input type="email" label="Email" icon="email" value={this.state.email} onChange={this.handleEmailChange} />
                            <Button label="RSVP" onClick={this.handleSetEmail} raised primary />
                        </span>
                    )}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RSVPPage);