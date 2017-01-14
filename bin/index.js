#!/usr/bin/env node
"use strict";
var program = require("commander");
var deploy_1 = require("./deploy");
var upload_1 = require("./upload");
var config = require("../wedding.config");
var pkg = require("../package.json");
if (!config.firebaseAdmin) {
    console.log("Firebase Admin configuration not found in wedding.config");
    process.exit(1);
}
if (!config.firebase) {
    console.error("Firebase configuration not found in wedding.config");
    process.exit(1);
}
program
    .version(pkg.version)
    .command("upload <guest-list-path>")
    .action(function (guestListPath) {
    upload_1.upload(guestListPath);
});
program
    .command("deploy")
    .action(function () {
    deploy_1.deploy();
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map