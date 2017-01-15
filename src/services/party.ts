import * as Firebase from "firebase";

import { RSVP } from "../models/guest";
import GuestList from "../models/guest-list";

namespace party {

    export function rsvpGuest(rsvp: RSVP) {
        return new Promise(function (then, reject) {

            console.log(rsvp);

            let userRef = Firebase.database().ref("parties/" + rsvp.party + "/" + rsvp.id);

            userRef.update({
                status: rsvp.status,
                fullName: rsvp.fullName,
                foodPreferences: rsvp.foodPreferences
            }).then(function() {
                console.log("data written");
            }).catch(function(error) {
                console.log(error);
            });
        });
    }
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