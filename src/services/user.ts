let md5 = require("blueimp-md5");

import * as Firebase from "firebase";

namespace user {

    export function getEmail(): Promise<{ email: string, emailHash: string }> {
        return new Promise(function (then, reject) {

            let user = Firebase.auth().currentUser;

            let userRef = Firebase.database().ref("users/" + user.uid);
            userRef.once("value").then(function (snapshot) {

                let email: string;
                let emailHash: string;

                if (snapshot.val()) {
                    emailHash = snapshot.val().emailHash;
                    email = snapshot.val().email;
                }
                then({ email, emailHash });
            });
        });
    }

    export function setEmail(email: string): Promise<{ email: string, emailHash: string }> {
        return new Promise(function (then, reject) {

            let user = Firebase.auth().currentUser;
            // This sets the email on actual Firebase user
            // This has restrictions.  The guest cannot
            // attempt to RSVP from a different browser
            // user.updateEmail(email);

            let emailHash = md5(email.toLowerCase());

            Firebase.database().ref("users/" + user.uid).update({
                email: email,
                emailHash: emailHash
            }).then(function () {
                then({ email: email, emailHash: emailHash });
            });
        });
    }
}

export default user;