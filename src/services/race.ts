import * as firebase from "firebase";

import { RegistrationStatus } from "../models/registration";

export function register(name: string, email: string): Promise<RegistrationStatus> {
    return new Promise(function (then, reject) {

        let user = firebase.auth().currentUser;
        console.log(user);

        then({success: true, message: "Great"});
    });
}
