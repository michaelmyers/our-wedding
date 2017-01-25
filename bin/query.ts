import * as admin from "firebase-admin";

const wedding = require("../wedding.config");

export function query() {

    console.log("time to query");

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

        // first iterate through the parties
        for (let partyName in parties) {

            let party = parties[partyName];

            for (let memberId in party) {
                totalGuests += 1;
                let member = party[memberId];
                if (member.status === "ATTENDING") {
                    console.log(member.status + " " + member.fullName);
                    totalAttending += 1;
                } else if (member.status === "DECLINED") {
                    console.log(member.status + " " + member.fullName);
                    totalDeclined += 1;
                }
                if (member.comment && member.comment.length > 0) {
                    console.log(member);
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