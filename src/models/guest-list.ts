

import Guest from "./guest";

export default class GuestList {

    private list: Guest[];

    private partyMap: { [party: string]: Guest[] } = {};

    get guests(): Guest[] {
        return this.list.slice();
    }

    get length(): number {
        return this.list.length;
    }

    get uniqueParties(): number {
        return Object.keys(this.partyMap).length;
    }

    get parties(): any {

        let parties: { [partyId: string]: {} } = {};

        for (let partyId in this.partyMap) {

            let memberMap: { [member: string]: Guest } = {};
            let members: Guest[] = this.partyMap[partyId];

            for (let guest of members) {
                memberMap[guest.id] = guest;
            }

            parties[partyId] = memberMap;
        }

        return parties;
    }

    get myparty() {

        let myparty: { [guestId: string]: string } = {};
        // iterate through the list
        for (let guest of this.list) {
            if (guest.party) {
                myparty[guest.id] = guest.party;
            }
        }

        return myparty;
    }

    constructor(list: Guest[]) {
        this.list = list;

        // now find the parties!
        for (let guest of this.list) {
            if (!this.partyMap[guest.party]) {
                // if it doesn't exist add it.
                this.partyMap[guest.party] = [];
            }
            // add the guest
            this.partyMap[guest.party].push(guest);
        }
    }

    static parse(data: any[] | { [key: string]: any }): GuestList {

        let guestList: Guest[] = [];

        // If it is an array, parse like one
        if (Array.isArray(data)) {
            for (let datum of data) {
                let guest = Guest.parse(datum);
                if (guest) {
                    guestList.push(guest);
                }
            }
            // Other wise iterate through the keys, it came from the DB
        } else if (typeof data === "object") {
            for (let key of Object.keys(data)) {
                // Keep track of the key, set it as the ID
                let id: string = key as string;
                let guestProps = {...data[key], id };
                let guest = Guest.parse(guestProps);
                if (guest) {
                    guestList.push(guest);
                }
            }
        }

        return new GuestList(guestList);
    }
}