import { expect } from "chai";

import * as testUtil from "../utils/test";
import GuestList from "./guest-list";

describe("GuestList", function () {
    describe("parse", function () {
        describe("for the sample data", function () {

            let data = testUtil.getSampleListSync();
            let guestList = GuestList.parse(data);

            it("returns the correct length", function () {
                expect(guestList).to.have.length(16);
            });
            it("returns the correct number of unique parties", function () {
                expect(guestList.uniqueParties).to.equal(6);
            });
            it("has the correct myparty length", function () {
                expect(Object.keys(guestList.myparty)).to.have.length(16);
            });
        });
        describe("for data from the database", function () {
            let data = {
                "123456": {
                    "email": "",
                    "firstName": "Josiah",
                    "lastName": "Jason",
                    "party": "Jason-1"
                },
                "ABCDEF": {
                    "email": "Rudy@Ratcliff.com",
                    "firstName": "Rudy",
                    "lastName": "Ratcliff",
                    "party": "Jason-1"
                }
            };

            let guestList = GuestList.parse(data);

            it("returns the correct length", function () {
                expect(guestList).to.have.length(2);
            });
            it("returns the correct number of unique parties", function () {
                expect(guestList.uniqueParties).to.equal(1);
            });
            it("has the correct myparty length", function () {
                expect(Object.keys(guestList.myparty)).to.have.length(2);
            });

        });
    });
});