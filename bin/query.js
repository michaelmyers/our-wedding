"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var guest_1 = require("../src/models/guest");
var wedding = require("../wedding.config");
function query(event) {
    if (event === "secondary") {
        querySecondary();
    }
    else {
        queryGuestList();
    }
}
exports.query = query;
function querySecondary() {
    // Initialize firebase-admin
    admin.initializeApp({
        credential: admin.credential.cert(wedding.firebaseAdmin),
        databaseURL: wedding.firebase.databaseURL
    });
    // Get references to the database
    var database = admin.database();
    var secondaryRef = database.ref("/secondary");
    secondaryRef.once("value", function (dataSnapshot) {
        var people = dataSnapshot.val();
        console.log("name,email");
        for (var personId in people) {
            var person = people[personId];
            // console.log(person);
            var name_1 = person.name;
            var email = person.email;
            console.log(name_1 + "," + email);
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
    var database = admin.database();
    var partiesRef = database.ref("/parties");
    partiesRef.once("value", function (dataSnapshot) {
        var parties = dataSnapshot.val();
        var totalGuests = 0;
        var totalAttending = 0;
        var totalDeclined = 0;
        var guestList = [];
        console.log(guest_1.default.csvHeader());
        // first iterate through the parties
        for (var partyName in parties) {
            var party = parties[partyName];
            for (var memberId in party) {
                totalGuests += 1;
                var member = party[memberId];
                var guest = guest_1.default.parse(member);
                guestList.push(guest);
                console.log(guest.toCSV());
                if (member.status === "ATTENDING") {
                    // console.log(member.status + " " + member.fullName);
                    totalAttending += 1;
                }
                else if (member.status === "DECLINED") {
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
//# sourceMappingURL=query.js.map