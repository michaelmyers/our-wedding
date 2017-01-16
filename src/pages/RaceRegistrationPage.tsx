import * as React from "react";
import { connect } from "react-redux";
import { Button } from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";

import { register } from "../actions/race";
import { Col, Row } from "../components/Grid";
import { RegistrationStatus } from "../models/registration";
import { State } from "../reducers";

interface RaceRegistrationPageProps extends React.Props<any> {
    status: RegistrationStatus;
    email: string;
    name: string;
    register: (name: string, email: string) => (dispatch: Redux.Dispatch<any>) => void;
};

interface RaceRegistrationPageState {
    name: string;
    email: string;
}

function mapStateToProps(state: State) {
    return {
        status: state.race.status,
        email: state.user.email,
        name: state.user.name
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>) {
    return {
        register: function (name: string, email: string) {
            return dispatch(register(name, email));
        }
    };
}

export class RaceRegistrationPage extends React.Component<RaceRegistrationPageProps, RaceRegistrationPageState> {

    constructor(props: RaceRegistrationPageProps) {
        super(props);
        // console.log("Race constructor");
        // console.log(props);
        this.state = {
            name: props.name ? props.name : "",
            email: props.email ? props.email : ""
        };
    }

    componentWillReceiveProps(props: RaceRegistrationPageProps) {
        // console.log("Race componentWillReceiveProps");
        // console.log(props);
        if (props.email) {
            this.setState({ ...this.state, email: props.email });
        }

        if (props.name) {
            this.setState({ ...this.state, name: props.name });
        }
    }

    handleChange = (name: string, value: string) => {
        this.setState({ ...this.state, [name]: value });
    }

    handleRegister = () => {
        this.props.register(this.state.name, this.state.email);
    }

    render() {
        return (
            <span>
                <Row center>
                    <Col>
                        <h2>The Wedding 5k</h2>
                        <h3>3/18/17  - 9:30 AM Start</h3>
                    </Col>
                </Row>
                <Row center>
                    <Col>
                        <h4>Join us the morning of the wedding for a fun 5k!</h4>
                        <h4>More details coming soon!</h4>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={80}>
                        <p>
                            Registration is open until 3/11/17.
                            <br />
                            Register by 2/18/17 to ensure you get a custom race bib.
                        </p>
                        <section>
                            <Input
                                type="text"
                                label="Name"
                                name="name"
                                icon="assignment_ind"
                                value={this.state.name}
                                onChange={this.handleChange.bind(this, "name")} />
                            <Input
                                type="email"
                                label="Email"
                                icon="email"
                                value={this.state.email}
                                onChange={this.handleChange.bind(this, "email")} />
                        </section>
                    </Col>
                </Row>
                <Row center>
                    <Col>
                        <Button label="Register" onClick={this.handleRegister} raised />
                    </Col>
                </Row>
            </span>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RaceRegistrationPage);