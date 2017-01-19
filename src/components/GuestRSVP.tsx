import * as moment from "moment";
import * as React from "react";
import Checkbox from "react-toolbox/lib/checkbox";
import Input from "react-toolbox/lib/input";

import { Col, Row } from "../components/Grid";
import Guest, { RSVP, RSVPStatus } from "../models/guest";
const checkboxTheme = require("../styles/checkbox.scss");

interface GuestRSVPProps {
    guest: Guest;
    onChange?: (rsvp: RSVP) => void;
    onNameChange?: (guest: Guest, fullName: string) => void;
}

interface GuestRSVPState extends RSVP {
    accepts: boolean;
    declines: boolean;
}

export default class GuestRSVP extends React.Component<GuestRSVPProps, GuestRSVPState> {

    constructor(props: GuestRSVPProps) {
        super(props);

        let accepts = false;
        let declines = false;

        if (this.props.guest.status === "ATTENDING") {
            accepts = true;
        }

        if (this.props.guest.status === "DECLINED") {
            declines = true;
        }

        this.state = {
            fullName: props.guest.fullName,
            party: props.guest.party,
            id: props.guest.id,
            status: props.guest.status,
            accepts,
            declines,
            comments: props.guest.comments
        };

        this.updateAccept = this.updateAccept.bind(this);
        this.updateDecline = this.updateDecline.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateComments = this.updateComments.bind(this);
        this.updateOnChangeListener = this.updateOnChangeListener.bind(this);
    }

    updateOnChangeListener(rsvp: RSVP) {
        if (this.props.onChange) {
            this.props.onChange(rsvp);
        }
    }

    updateComments(comments: string) {
        let newState = { ...this.state, comments };
        this.updateOnChangeListener(newState);
        this.setState(newState);
    }

    updateName(fullName: string) {
        let newState = {
            ...this.state,
            fullName
        };
        this.updateOnChangeListener(newState);
        this.setState(newState);
    }

    updateAccept(accepts: boolean) {
        let declines = accepts ? false : this.state.declines;
        let newState = {
            ...this.state,
            status: this.determineStatus(accepts, declines),
            accepts,
            declines
        };
        this.updateOnChangeListener(newState);
        this.setState(newState);
    }

    updateDecline(declines: boolean) {
        let accepts = declines ? false : this.state.accepts;
        let newState = {
            ...this.state,
            status: this.determineStatus(accepts, declines),
            accepts,
            declines
        };
        this.updateOnChangeListener(newState);
        this.setState(newState);
    }

    determineStatus(accepts: boolean, declines: boolean): RSVPStatus {
        let status: RSVPStatus = "UNKNOWN";

        if (accepts) {
            status = "ATTENDING";
        } else if (declines) {
            status = "DECLINED";
        }

        return status;
    }

    render() {
        return (
            <div
                style={{
                    backgroundColor: "rgba(46, 46, 46, 0.04)",
                    padding: "10px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    borderBottomLeftRadius: "10px",
                    borderTopLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    borderTopRightRadius: "10px"
                }}>
                <Row>
                    <Col>
                        <Input
                            hint="Guest Name"
                            type="text"
                            value={this.state.fullName}
                            onChange={this.updateName} />
                    </Col>
                </Row>
                <Row>
                    <Col percentage={45}>
                        <Checkbox
                            theme={checkboxTheme}
                            checked={this.state.accepts}
                            label="Happily Accepts"
                            onChange={this.updateAccept}
                        />
                    </Col>
                    <Col percentage={45}>
                        <Checkbox
                            theme={checkboxTheme}
                            checked={this.state.declines}
                            label="Regretfully Declines"
                            onChange={this.updateDecline}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            hint="Food Preferences? Comments?"
                            type="text"
                            value={this.state.comments}
                            onChange={this.updateComments} />
                    </Col>
                </Row>
                {this.props.guest.rsvpTimestamp > 0 ? (
                    <Row>
                        <Col>
                            <p style={{fontSize: "0.8em"}}>RSVP received {moment(this.props.guest.rsvpTimestamp).fromNow()} </p>
                        </Col>
                    </Row>
                ) : undefined }
            </div>
        );
    }
}