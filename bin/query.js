"use strict";
var admin = require("firebase-admin");
var wedding = require("../wedding.config");
function query() {
    console.log("time to query");
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
        // first iterate through the parties
        for (var partyName in parties) {
            var party = parties[partyName];
            for (var memberId in party) {
                totalGuests += 1;
                var member = party[memberId];
                if (member.status === "ATTENDING") {
                    console.log(member.status + " " + member.fullName);
                    totalAttending += 1;
                }
                else if (member.status === "DECLINED") {
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
exports.query = query;
//# sourceMappingURL=query.js.map