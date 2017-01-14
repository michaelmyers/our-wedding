#!/usr/bin/env node
"use strict";
var program = require("commander");
var parse = require("csv-parse");
var admin = require("firebase-admin");
var fs = require("fs");
var path = require("path");
var guest_list_1 = require("../src/models/guest-list");
var config = require("../wedding.config");
var wedding = require("../wedding.config");
var pkg = require("../package.json");
if (!config.firebaseAdmin) {
    console.log("Firebase Admin configuration not found in wedding.config");
    process.exit(1);
}
if (!config.firebase) {
    console.error("Firebase configuration not found in wedding.config");
    process.exit(1);
}
admin.initializeApp({
    credential: admin.credential.cert(config.firebaseAdmin),
    databaseURL: wedding.firebase.databaseURL
});
var database = admin.database();
var partiesRef = database.ref("/parties");
var mypartyRef = database.ref("/myparty");
var parser = parse({ delimiter: ",", columns: true }, function (err, data) {
    var guestList = guest_list_1.default.parse(data);
    var parties = guestList.parties;
    var myparty = guestList.myparty;
    function goOffline() {
        if (Object.keys(parties).length === 0 && Object.keys(myparty).length === 0) {
            console.log("All done, going offline");
            database.goOffline();
        }
    }
    var _loop_1 = function (partyId) {
        partiesRef.child(partyId).update(parties[partyId]).then(function () {
            console.log("Party " + partyId + " updated");
            delete parties[partyId];
            goOffline();
        });
    };
    for (var partyId in parties) {
        _loop_1(partyId);
    }
    var _loop_2 = function (guestId) {
        mypartyRef.child(guestId).set(myparty[guestId]).then(function () {
            console.log("Guest with ID " + guestId + " party updated to " + myparty[guestId]);
            delete myparty[guestId];
            goOffline();
        });
    };
    for (var guestId in myparty) {
        _loop_2(guestId);
    }
});
program
    .version(pkg.version)
    .command("upload <guest-list-path>")
    .action(function (guestListPath) {
    // Resolve the absolute path
    var guestListAbsolutePath = path.resolve(process.cwd(), guestListPath);
    // Read in the guest list and send it to the parser
    fs.createReadStream(guestListAbsolutePath).pipe(parser);
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map