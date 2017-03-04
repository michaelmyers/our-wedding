import * as client from "firebase-tools";

const wedding = require("../wedding.config");

export function deploy() {
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
    }).then(function() {
        console.log("All done");
    }).catch(function (err: any) {
        console.error(err.message);
    });
}