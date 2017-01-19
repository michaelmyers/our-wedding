import * as Firebase from "firebase";

import { Registration, RegistrationStatus } from "../models/registration";

namespace race {
    export function register(registration: Registration): Promise<RegistrationStatus> {
        return new Promise(function (then, reject) {
            let user = Firebase.auth().currentUser;
            Firebase.database().ref("secondary/" + user.uid).update({
                name: registration.name,
                email: registration.email,
                date: new Date().getTime(),
                participation: true
            }).then(function () {
                then({ success: true, message: "Thank you for registering!" });
            });
        });
    }
    export function getRegistration(): Promise<Registration> {
        return new Promise(function (then, reject) {
            let user = Firebase.auth().currentUser;
            Firebase.database().ref("secondary/" + user.uid).once("value").then(function (snapshot) {
                let userInfo = snapshot.val();
                console.log(userInfo);
                if (userInfo) {
                    then(userInfo);
                }
            });
        });
    }
}

export default race;