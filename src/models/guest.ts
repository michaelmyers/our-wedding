let md5 = require("blueimp-md5");

import { generateId } from "../utils";

export type RSVPStatus = "ATTENDING" | "DECLINED" | "UNKNOWN";

export interface RSVP {
    fullName?: string;
    status?: RSVPStatus;
    foodPreferences?: string;
    party?: string;
    id?: string;
}

export interface GuestProps extends RSVP {
    email?: string;
    firstName?: string;
    lastName?: string;
    rsvpDate?: Date;
}

export default class Guest implements GuestProps {

    constructor(props: GuestProps) {
        this.email = props.email;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.fullName = props.fullName ? props.fullName : this.firstName + " " + this.lastName;
        this.party = props.party;
        this.foodPreferences = props.foodPreferences ? props.foodPreferences : "";
        this.rsvpDate = props.rsvpDate;
        this.status = props.status ? props.status : "UNKNOWN";
    }

    readonly status: RSVPStatus;

    readonly foodPreferences: string;

    readonly rsvpDate: Date;

    readonly email: string;

    get id(): string {
        let id: string;

        if (this.email) {
            id = md5(this.email.toLowerCase());
        } else if (this.firstName || this.lastName) {
            // If no email, they are probably a child of one
            // of the adult guests.
            id = md5(this.firstName.toLowerCase() + this.lastName.toLowerCase());
        } else {
            // They are a plus one, just give them an ID;
            id = md5(generateId().toLowerCase());
        }

        return id;
    }

    readonly firstName: string;

    readonly lastName: string;

    readonly fullName: string;

    readonly party: string;

    static parse(data: any): Guest | undefined {

        if (!data) {
            return undefined;
        }

        let email = data["EMAIL"] || data["email"];
        let firstName = data["FNAME"] || data["firstName"];
        let lastName = data["LNAME"] || data["lastName"];
        let party = data["PARTY"] || data["party"];

        let status = data["status"];
        let foodPreferences = data["foodPreferences"];
        let fullName = data["fullName"];

        // A couple of rules.
        // 1. If none of the data exists, return undefined
        // This happens with empty rows in the CSV
        if (!email && !firstName && !lastName && !party) {
            return undefined;
        }

        // 2. If no email exists, a party is needed.
        // They are most likely a +1, otherwise we can't
        // do anything with out an email
        if (!email && !party) {
            return undefined;
        }

        // 3. If no party exists, make one for them.  They are
        // a party of one.  Hopefully this isn't necessary
        if (!party && lastName) {
            party = lastName + "-" + generateId();
        }

        return new Guest({ email, fullName, firstName, lastName, party, status, foodPreferences });
    }
}