#!/usr/bin/env node

import * as program from "commander";

import { deploy } from "./deploy";
import { upload } from "./upload";

const config = require("../wedding.config");
const pkg = require("../package.json");

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
  .action(function (guestListPath: string) {
    upload(guestListPath);
  });

program
  .command("deploy")
  .action(function () {
    deploy();
  });

program.parse(process.argv);

