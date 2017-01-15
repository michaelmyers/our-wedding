import * as parse from "csv-parse";
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

import GuestList from "../src/models/guest-list";

const wedding = require("../wedding.config");

export function upload(guestListPath: string) {

    // Resolve the absolute path
    let guestListAbsolutePath = path.resolve(process.cwd(), guestListPath);

    // Initialize firebase-admin
    admin.initializeApp({
        credential: admin.credential.cert(wedding.firebaseAdmin),
        databaseURL: wedding.firebase.databaseURL
    });

    // Get references to the database
    let database: firebase.database.Database = admin.database() as any;
    let partiesRef = database.ref("/parties");
    let mypartyRef = database.ref("/myparty");

    // Create the parser
    let parser = parse({ delimiter: ",", columns: true }, function (err, data) {

        let guestList = GuestList.parse(data);
        let parties = guestList.parties;
        let myparty = guestList.myparty;

        // Checks if all the data is written, if it is it closes the DB connection.
        function goOffline() {
            if (Object.keys(parties).length === 0 && Object.keys(myparty).length === 0) {
                console.log("All done, going offline");
                database.goOffline();
            }
        }

        for (let partyId in parties) {
            partiesRef.child(partyId).update(parties[partyId]).then(function () {
                console.log("Party " + partyId + " updated");
                delete parties[partyId];
                goOffline();
            });
        }

        for (let guestId in myparty) {
            mypartyRef.child(guestId).set(myparty[guestId]).then(function () {
                console.log("Guest with ID " + guestId + " party updated to " + myparty[guestId]);
                delete myparty[guestId];
                goOffline();
            });
        }
    });

    // Read in the guest list and send it to the parser
    fs.createReadStream(guestListAbsolutePath).pipe(parser);
}