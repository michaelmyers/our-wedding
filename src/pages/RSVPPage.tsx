import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Button } from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";

import { getParty, rsvpGuest } from "../actions/party";
import { setEmail } from "../actions/user";
import { Col, Row } from "../components/Grid";
import { RSVP } from "../models/guest";
import GuestList from "../models/guest-list";
import { State } from "../reducers";

import GuestRSVP from "../components/GuestRSVP";

interface RSVPPageProps {
    setEmail: (email: string) => (dispatch: Redux.Dispatch<any>) => void;
    getParty: () => (dispatch: Redux.Dispatch<any>) => void;
    rsvpGuest: (rsvp: RSVP) => (dispatch: Redux.Dispatch<any>) => void;
    user: firebase.User;
    email: string;
    emailHash: string;
    party: GuestList;
    error: Error;
    rsvpSuccess: boolean;
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
        error: state.user.partyError,
        rsvpSuccess: state.user.rsvpSuccess
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
            return dispatch(rsvpGuest(rsvp));
        }
    };
}

export class RSVPPage extends React.Component<RSVPPageProps, RSVPPageState> {

    constructor(props: RSVPPageProps) {
        super(props);

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
        // console.log("RSVP willReceiveProps");
        // console.log(nextProps);
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
        for (let id in this.state.rsvps) {
            this.props.rsvpGuest(this.state.rsvps[id]);
        }
    }

    onRSVPChange(rsvp: RSVP) {
        this.state.rsvps[rsvp.id] = rsvp;
    }

    render() {

        let party: JSX.Element[] = [];
        if (this.state.party) {
            for (let guest of this.state.party.guests) {
                party.push(
                    <li key={guest.id} style={{ listStyle: "none" }}>
                        <GuestRSVP guest={guest} onChange={this.onRSVPChange} />
                    </li>
                );
            }
        }

        return (
            <span>
                {this.props.party ? (
                    <span>
                        <Row center>
                            <Col>
                                <h2>RSVP</h2>
                                <p>Please respond by February 18</p>
                            </Col>
                        </Row>
                        <Row center>
                            <Col percentage={75}>
                                <ul style={{ paddingLeft: 0 }}>
                                    {party}
                                </ul>
                            </Col>
                        </Row>
                        <Row center>
                            <Col>
                                <Button
                                    label="RSVP"
                                    raised
                                    onClick={this.handleRSVP} />
                            </Col>
                        </Row>
                    </span>
                ) : undefined}
                {this.props.rsvpSuccess ? (
                    <Row center>
                        <Col>
                            <h4>Thank you for your RSVP!</h4>
                            <h4>Be sure to register for the <Link to="/race">5k!</Link></h4>
                        </Col>
                    </Row>
                ) : undefined}
                {this.props.error ? (
                    <Row center>
                        <Col percentage={80}>
                            <h4 style={{color: "#FF5252"}}>{this.props.error.message}</h4>
                        </Col>
                    </Row>
                ) : undefined}
                {this.props.user && !this.props.email ? (
                    <Row center>
                        <Col percentage={80}>
                            <p> Please enter you email: </p>
                            <Input
                                type="email"
                                label="Email"
                                icon="email"
                                value={this.state.email}
                                onChange={this.handleEmailChange} />
                            <Button
                                label="RSVP"
                                raised
                                onClick={this.handleSetEmail} />
                        </Col>
                    </Row>
                ) : undefined}
            </span>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RSVPPage);