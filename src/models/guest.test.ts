import { expect } from "chai";

import Guest from "./guest";

describe("Guest", function () {
    describe("constructor", function () {
        let guest = new Guest({
            firstName: "Josh",
            lastName: "Joshua",
            party: "Joshua-1"
        });

        it("sets the first name", function () {
            expect(guest.firstName).to.equal("Josh");
        });
        it("sets the last name", function () {
            expect(guest.lastName).to.equal("Joshua");
        });
        it("sets the party", function () {
            expect(guest.party).to.equal("Joshua-1");
        });
    });
    describe("parse", function () {
        describe("with name, email and party data", function () {
            // Test Note: This is the normal test case
            let guest = Guest.parse({FNAME: "Josiah", LNAME: "Jason", PARTY: "Jason-1", EMAIL: "one@email.com"});

            it("sets the email", function() {
                expect(guest.email).to.equal("one@email.com");
            });
            it("sets the first name", function () {
                expect(guest.firstName).to.equal("Josiah");
            });
            it("sets the last name", function () {
                expect(guest.lastName).to.equal("Jason");
            });
            it("sets the party", function () {
                expect(guest.party).to.equal("Jason-1");
            });
        });

        describe("without name data but party data", function () {
            // Test Note: This is a plus one
            let guest = Guest.parse({PARTY: "Jason-1"});

            it("sets the email", function() {
                expect(guest.email).to.be.undefined;
            });
            it("sets the first name", function () {
                expect(guest.firstName).to.be.undefined;
            });
            it("sets the last name", function () {
                expect(guest.lastName).to.be.undefined;
            });
            it("sets the party", function () {
                expect(guest.party).to.equal("Jason-1");
            });
        });
        describe("with name/email data but no party data", function () {
            // Test Note: This tests the party of one logic.

            let guest = Guest.parse({FNAME: "Josiah", LNAME: "Jason", EMAIL: "one@email.com"});

            it("sets the email", function() {
                expect(guest.email).to.equal("one@email.com");
            });
            it("sets the first name", function () {
                expect(guest.firstName).to.equal("Josiah");
            });
            it("sets the last name", function () {
                expect(guest.lastName).to.equal("Jason");
            });
            it("sets the party", function () {
                expect(guest.party).to.contain("Jason-");
            });
        });
    });
});