import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { Button } from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";

import { getRegistration, register } from "../actions/race";
import { Col, Row } from "../components/Grid";
import { Registration, RegistrationStatus } from "../models/registration";
import { State } from "../reducers";

let buttonStyle = require("../styles/button");
let inputStyle = require("../styles/input");

interface RaceRegistrationPageProps extends React.Props<any> {
    status: RegistrationStatus;
    registration: Registration;
    user: firebase.User;
    name: string;
    email: string;
    register: (registration: Registration) => (dispatch: Redux.Dispatch<any>) => void;
    getRegistration: () => (dispatch: Redux.Dispatch<any>) => void;
};

interface RaceRegistrationPageState {
    registration: Registration;
}

function mapStateToProps(state: State) {
    return {
        status: state.race.status,
        registration: state.race.registration,
        user: state.user.user,
        name: state.user.name,
        email: state.user.email
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>) {
    return {
        register: function (registration: Registration) {
            return dispatch(register(registration));
        },
        getRegistration: function () {
            return dispatch(getRegistration());
        }
    };
}

export class RaceRegistrationPage extends React.Component<RaceRegistrationPageProps, RaceRegistrationPageState> {

    constructor(props: RaceRegistrationPageProps) {
        super(props);

        if (this.props.user && !this.props.registration) {
            this.props.getRegistration();
        }

        let registration: Registration = {};
        registration.name = this.props.name ? this.props.name : "";
        registration.email = this.props.email ? this.props.email : "";

        this.state = {
            registration: this.props.registration ? this.props.registration : registration
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentWillReceiveProps(props: RaceRegistrationPageProps) {

        // If we have a user but no registration, try to get it.
        if (props.user && !props.registration) {
            this.props.getRegistration();
        }

        let registration: Registration = {};
        registration.name = props.name ? props.name : "";
        registration.email = props.email ? props.email : "";

        this.setState({
            registration: props.registration ? props.registration : registration
        });
    }

    handleNameChange(name: string) {
        this.setState({
            registration: { ...this.state.registration, name }
        });
    }

    handleEmailChange(email: string) {
        this.setState({
            registration: { ...this.state.registration, email }
        });
    }

    handleRegister() {
        this.props.register(this.state.registration);
    }

    render() {
        return (
            <span>
                <Row center>
                    <Col>
                        <h2>Annie & Michael</h2>
                        <h2>Wedding Day 5k</h2>
                        <h3>3/18/17</h3>
                        <h4>9:30 AM Start</h4>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={80}>
                        <h4>Join us the morning of the wedding for a fun 5k.</h4>
                        <h4>More details coming soon!</h4>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={80}>
                        <p>
                            Online registration is open until 3/11/17.
                        </p>
                        <p>
                            Register by 2/18/17 to ensure you get a custom race bib.
                        </p>
                        <section>
                            <Input
                                theme={inputStyle}
                                type="text"
                                label="Name for Bib"
                                name="name"
                                icon="assignment_ind"
                                value={this.state.registration.name}
                                onChange={this.handleNameChange} />
                            <Input
                                theme={inputStyle}
                                type="email"
                                label="Email"
                                icon="email"
                                value={this.state.registration.email}
                                onChange={this.handleEmailChange} />
                        </section>
                    </Col>
                </Row>
                {this.props.registration ? (
                    <Row center>
                        <Col>
                            <p> Registered {moment(this.props.registration.date).fromNow()} </p>
                        </Col>
                    </Row>
                ) : undefined}
                <Row center>
                    <Col>
                        <Button theme={buttonStyle} label="Register" onClick={this.handleRegister} raised />
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={80} style={{marginTop: "20px", fontSize:"1.0em"}}>
                        <p><i>Please Note:</i> Participants must register themselves at this page.  Please share this link with other members of your party so that they can register.</p>
                        <p>To email the link, click <a href="mailto:?subject=5k Race Registration&body=Be sure to fill out your registration by 2/18/17 to get a custom race bib.  https://annieandmichael.love/race">here.</a></p>
                    </Col>
                </Row>
                {this.props.status ? (
                    <Row center>
                        <Col>
                            <h4> Thank you for registering! </h4>
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
)(RaceRegistrationPage);