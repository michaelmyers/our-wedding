#!/usr/bin/env node

import * as program from "commander";
import * as parse from "csv-parse";
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

import GuestList from "../src/models/guest-list";

const config = require("../wedding.config");
const pkg = require("../package.json");

if (!config.firebase) {
  console.error("Firebase configuration not found in wedding.config");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: "https://wedding-website-b17ea.firebaseio.com"
});

let database: firebase.database.Database = admin.database() as any;
let partiesRef = database.ref("/parties");
let mypartyRef = database.ref("/myparty");

let parser = parse({ delimiter: ",", columns: true }, function (err, data) {

  let guestList = GuestList.parse(data);
  let parties = guestList.parties;
  let myparty = guestList.myparty;

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
    mypartyRef.child(guestId).set(myparty[guestId]).then(function() {
      console.log("Guest with ID " + guestId + " party updated to " + myparty[guestId]);
      delete myparty[guestId];
      goOffline();
    });
  }
});

program
  .version(pkg.version)
  .command("upload <guest-list-path>")
  .action(function (guestListPath: string) {

    // Resolve the absolute path
    let guestListAbsolutePath = path.resolve(process.cwd(), guestListPath);

    // Read in the guest list and send it to the parser
    fs.createReadStream(guestListAbsolutePath).pipe(parser);

  });

program.parse(process.argv);

