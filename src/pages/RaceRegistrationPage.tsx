import * as React from "react";
import { connect } from "react-redux";
import { Button } from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";

import { register } from "../actions";
import { RegistrationStatus } from "../models/registration";
import { State } from "../reducers";

interface RaceRegistrationPageProps extends React.Props<any> {
    status: RegistrationStatus;
    email: string;
};

interface RaceRegistrationPageState {
    name: string;
    email: string;
    hint?: string;
}

function mapStateToProps(state: State) {
    return {
        status: state.race.status,
        email: state.user.email
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>) {
    return {
    };
}

export class RaceRegistrationPage extends React.Component<RaceRegistrationPageProps, RaceRegistrationPageState> {

    constructor(props: RaceRegistrationPageProps) {
        super(props);

        console.log("Race constructor");
        console.log(props);
        this.state = {
            name: "",
            email: props.email ? props.email : "",
            hint: ""
        };
    }

    componentWillReceiveProps(props: RaceRegistrationPageProps) {
        console.log("Race componentWillReceiveProps");
        console.log(props);
        if (props.email) {
            this.setState({...this.state, email: props.email});
        }
    }

    handleChange = (name: string, value: string) => {
        this.setState({ ...this.state, [name]: value });
    }

    handleRegister = () => {
        register(this.state.name, this.state.email);
    }

    render() {
        return (
            <div>
                <h2>The Wedding 5k</h2>
                <section>
                    <Input type="text" label="Name" name="name" icon="assignment_ind" value={this.state.name} onChange={this.handleChange.bind(this, "name")} />
                    <Input type="email" label="Email" icon="email" value={this.state.email} onChange={this.handleChange.bind(this, "email")} />
                </section>
                <Button label="Register" onClick={this.handleRegister} raised primary />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RaceRegistrationPage);