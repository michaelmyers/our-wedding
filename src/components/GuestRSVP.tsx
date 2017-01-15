import * as React from "react";
import Checkbox from "react-toolbox/lib/checkbox";
import Input from "react-toolbox/lib/input";

import Guest, { RSVP, RSVPStatus } from "../models/guest";

interface GuestRSVPProps {
    guest: Guest;
    onChange?: (guest: Guest, rsvp: RSVP) => void;
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
            foodPreferences: props.guest.foodPreferences
        };

        this.updateAccept = this.updateAccept.bind(this);
        this.updateDecline = this.updateDecline.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateFoodPreferences = this.updateFoodPreferences.bind(this);
        this.updateOnChangeListener = this.updateOnChangeListener.bind(this);
    }

    updateOnChangeListener(rsvp: RSVP) {
        if (this.props.onChange) {
            this.props.onChange(this.props.guest, rsvp);
        }
    }

    updateFoodPreferences(foodPreferences: string) {
        let newState = { ...this.state, foodPreferences };
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
            <div>
                <Input
                    hint="Guest Name"
                    type="text"
                    value={this.state.fullName}
                    onChange={this.updateName} />
                <Checkbox
                    checked={this.state.accepts}
                    label="Delightfully Accepts"
                    onChange={this.updateAccept}
                    />
                <Checkbox
                    checked={this.state.declines}
                    label="Regretfully Declines"
                    onChange={this.updateDecline}
                    />
                <Input
                    hint="Food Preferences?"
                    type="text"
                    value={this.state.foodPreferences}
                    onChange={this.updateFoodPreferences} />
            </div>
        );
    }
}