import * as Firebase from "firebase";

import GuestList from "../models/guest-list";

namespace party {
    export function getParty(): Promise<GuestList> {
        return new Promise(function (then, reject) {

            let user = Firebase.auth().currentUser;

            // We need the email hash of the user.
            let userRef = Firebase.database().ref("users/" + user.uid);
            userRef.once("value").then(function (snapshot) {

                let emailHash = snapshot.val().emailHash;
                let mypartyRef = Firebase.database().ref("myparty/" + emailHash);
                mypartyRef.once("value").then(function (snapshot) {
                    let party = snapshot.val();

                    if (!party) {
                        let errorMessage = "The provided email is not on the list";
                        console.info(errorMessage);
                        reject(new Error(errorMessage));
                    } else {
                        let partiesRef = Firebase.database().ref("parties/" + party);
                        partiesRef.once("value").then(function (snapshot) {
                            let guestList = GuestList.parse(snapshot.val());
                            then(guestList);
                        });
                    }
                });
            });
        });
    }
}

export default party;