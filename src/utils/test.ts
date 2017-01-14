import * as parse from "csv-parse";
let parseSync = require("csv-parse/lib/sync");
import * as fs from "fs";

const sampleListLocation = "./assets/sample-list.csv";

/**
 * Get the sample data from /assets/sample-list.csv, only used for testing.
 *
 * @export
 * @returns {Promise<any[]>}
 */
export function getSampleList(): Promise<any[]> {
    return new Promise(function (then, error) {
        let parser = parse({ delimiter: ",", columns: true }, function (err, data) {
            then(data);
        });
        fs.createReadStream(sampleListLocation).pipe(parser);
    });
}


export function getSampleListSync(): any[] {
    let data = fs.readFileSync(sampleListLocation);
    return parseSync(data, { delimiter: ",", columns: true });
}