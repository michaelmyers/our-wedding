import { expect } from "chai";

import * as test from "./test";

describe("getSampleList", function () {
    it("gets the sample data", function () {
        return test.getSampleList().then(function (data) {
            expect(data).to.exist;
            expect(data).to.have.length(16);
        });
    });
});
describe("getSampleListSync", function () {
    it("gets the sample data", function () {
        let data = test.getSampleListSync();
        expect(data).to.exist;
        expect(data).to.have.length(16);
    });
});