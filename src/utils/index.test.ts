import { expect } from "chai";
let md5 = require("blueimp-md5");

import { generateId, hash } from "./index";

describe("hash function", function () {
    describe("for an email", function () {
        let email = "some@email.com";
        let hash1 = hash(email);
        let hash2 = hash(email);

        it("the hash is not equal to the email", function () {
            expect(hash1).to.not.equal(email);
        });
        it("the hash is consistant", function () {
            expect(hash1).to.equal(hash2);
        });
    });
});
describe("md5 function", function () {
    describe("for an email", function () {
        let email = "some@email.com";
        let hash1 = md5(email);
        let hash2 = md5(email);

        it("the hash is not equal to the email", function () {
            expect(hash1).to.not.equal(email);
        });
        it("the hash is consistant", function () {
            expect(hash1).to.equal(hash2);
        });
    });
});

describe("generateId", function() {
    let id = generateId();
    it("generates a unique random alphanumeric string", function() {
        expect(id).to.exist;
        expect(id).to.be.length(5);
    });
});