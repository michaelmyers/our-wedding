import * as admin from "firebase-admin";

import Guest from "../src/models/guest";
const wedding = require("../wedding.config");

export function query(event: string) {
    if (event === "secondary") {
        querySecondary();
    } else {
        queryGuestList();
    }
}

function querySecondary() {

    // Initialize firebase-admin
    admin.initializeApp({
        credential: admin.credential.cert(wedding.firebaseAdmin),
        databaseURL: wedding.firebase.databaseURL
    });

    // Get references to the database
    let database: firebase.database.Database = admin.database() as any;
    let secondaryRef = database.ref("/secondary");

    secondaryRef.once("value", function(dataSnapshot: firebase.database.DataSnapshot) {

        let people = dataSnapshot.val();

        console.log("name,email");

        for (let personId in people) {

            let person = people[personId];
            // console.log(person);

            let name = person.name;
            let email = person.email;

            console.log(name + "," + email);
        }

        database.goOffline();
    });
}

function queryGuestList() {

    console.log("time to query ");

        // Initialize firebase-admin
    admin.initializeApp({
        credential: admin.credential.cert(wedding.firebaseAdmin),
        databaseURL: wedding.firebase.databaseURL
    });

    // Get references to the database
    let database: firebase.database.Database = admin.database() as any;
    let partiesRef = database.ref("/parties");
    partiesRef.once("value", function(dataSnapshot: firebase.database.DataSnapshot) {

        let parties = dataSnapshot.val();

        let totalGuests = 0;
        let totalAttending = 0;
        let totalDeclined = 0;

        let guestList: Guest[] = [];

        console.log(Guest.csvHeader());

        // first iterate through the parties
        for (let partyName in parties) {

            let party = parties[partyName];

            for (let memberId in party) {
                totalGuests += 1;
                let member = party[memberId];
                let guest = Guest.parse(member);
                guestList.push(guest);

                console.log(guest.toCSV());

                if (member.status === "ATTENDING") {
                    // console.log(member.status + " " + member.fullName);
                    totalAttending += 1;
                } else if (member.status === "DECLINED") {
                    // console.log(member.status + " " + member.fullName);
                    totalDeclined += 1;
                }
            }
        }

        console.log("Total Guest: " + totalGuests);
        console.log("Total Attending: " + totalAttending);
        console.log("Total Declined: " + totalDeclined);
        console.log("Total Responded: " + (totalAttending + totalDeclined));
        console.log("% Responded: " + ((totalAttending + totalDeclined) / totalGuests) * 100);
        console.log("% Attendance: " + (totalAttending / totalGuests) * 100);

        database.goOffline();
    });
}