"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client = require("firebase-tools");
var wedding = require("../wedding.config");
function deploy() {
    console.log("Deploying " + wedding.firebaseAdmin.project_id);
    client.deploy({
        project: wedding.firebaseAdmin.project_id,
        token: process.env.FIREBASE_TOKEN,
        cwd: process.cwd(),
        hosting: {
            "public": "public",
            "rewrites": [
                {
                    "source": "**",
                    "destination": "/index.html"
                }
            ]
        }
    }).then(function () {
        console.log("All done");
        // console.log("\n");
    }).catch(function (err) {
        console.error(err.message);
    });
}
exports.deploy = deploy;
//# sourceMappingURL=deploy.js.map