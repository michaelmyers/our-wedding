let md5 = require("blueimp-md5");

import { generateId } from "../utils";

export interface GuestProps {
    email?: string;
    firstName?: string;
    lastName?: string;
    party?: string;
}

export default class Guest implements GuestProps {

    constructor(props: GuestProps) {
        this.email = props.email;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.party = props.party;
    }

    readonly email: string;

    get id(): string {
        let id: string;

        if (this.email) {
            id = md5(this.email.toLowerCase());
        } else if (this.firstName || this.lastName) {
            // If now email, they are probably a child of one
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

    get fullName(): string {
        return this.firstName + " " + this.lastName;
    }

    readonly party: string;

    static parse(data: any): Guest | undefined {

        if (!data) {
            return undefined;
        }

        let email = data["EMAIL"] || data["email"];
        let firstName = data["FNAME"] || data["firstName"];
        let lastName = data["LNAME"] || data["lastName"];
        let party = data["PARTY"] || data["party"];

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

        return new Guest({ email, firstName, lastName, party });
    }
}