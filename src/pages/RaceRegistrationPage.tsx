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
                        <p>9:00 AM Check-In</p>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={80}>
                        <iframe
                            src="https://www.google.com/maps/d/u/1/embed?mid=1sWrbbnI_VuPhYdFXbDlM3jbt_n8"
                            width="640"
                            height="480" />
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={60}>
                        <h3>Details</h3>
                        <p>
                            Check-in will start at 9:00 AM with the race starting a 9:30 AM.
                            Some light food and water will be provided as well as a place to store any personal items while you run.
                            The awards ceremony will start once all racers have completed the course.
                        </p>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={60}>
                        <h3>Course</h3>
                        <p>
                            The course is a simple out and back along the Anacostia River Walk Trail, a common route for Annie and Michael.
                            The start-finish is in Anacostia Park (Section F) near Benning Road.
                            The turn-around is along the trail in the middle of the only bridge on the trail that crosses over a railroad.
                        </p>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={60}>
                        <h3>Awards</h3>
                        <h4>1st Place Male</h4>
                        <h4>1st Place Female</h4>
                        <h4>1st Married Couple</h4>
                        <h4>Most Enthusiastic</h4>
                        <h4>Funniest Story from the Run</h4>
                        <h4>Most Vibrant Running Outfit</h4>
                        <h4>Got Your Money's Worth</h4>
                        <i>(For the participant who spends the most time on the course)</i>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={60}>
                        <h3>Transportation</h3>
                        <p>There are several ways to get to the start line in Anacostia Park.
                           If you are driving, using the Oklahoma Ave entrance to park in the RFK Stadium Lot 7.
                           Otherwise, see the map for other nearby transportation options. </p>
                    </Col>
                </Row>
                <Row center>
                    <Col>
                        <h3>Register </h3>
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
                    <Col percentage={80} style={{ marginTop: "20px", fontSize: "1.0em" }}>
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