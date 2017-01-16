import * as Firebase from "firebase";

import { RegistrationStatus } from "../models/registration";

namespace race {
    export function register(name: string, email: string): Promise<RegistrationStatus> {
        return new Promise(function (then, reject) {

            let user = Firebase.auth().currentUser;
            Firebase.database().ref("users/" + user.uid).update({
                name,
                raceEmail: email,
                race: true
            }).then(function () {
                then({ success: true, message: "Great" });
            });
        });
    }
    export function getRegistration(): Promise<RegistrationStatus> {
        return new Promise(function (then, reject) {

            let user = Firebase.auth().currentUser;
            Firebase.database().ref("users/" + user.uid).once("value").then(function (snapshot) {
                let userInfo = snapshot.val();
                if (userInfo) {
                    then({ success: true, message: "Great" });
                }
            });
        });
    }
}

export default race;