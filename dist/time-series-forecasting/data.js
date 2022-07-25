import { default as fetch } from 'node-fetch';
import * as fsp from 'node:fs/promises';
import * as fs from 'node:fs';
import { Ok, Err } from 'ts-results';
import { UnreachableCaseError } from './unreachable_case_error.js';
// filename for the weather csv data
const csv = 'jena_climate_2009_2016.csv';
// file path for the weather csv data
const csv_path = '.';
// access for the external csv data
const fetchExternal = async () => {
    // url for the external download
    const endpointURL = `https://storage.googleapis.com/learnjs-data/jena_climate/${csv}`;
    const fetched = await fetch(endpointURL);
    // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
};
// access the local csv data
const readLocal = async () => {
    // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
    // @see https://github.com/nodejs/node/blob/master/doc/api/stream.md
    // @see https://github.com/nodejs/node/blob/main/doc/api/fs.md#class-fswritestream
    try {
        const file = await fsp.readFile(`${csv_path}/${csv}`, 'utf-8');
        return Ok(file);
    }
    catch (error) {
        // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48281
        // @see https://fettblog.eu/typescript-typing-catch-clauses
        const err = error;
        // @see https://nodejs.org/api/errors.html#class-systemerror
        if (err.code == 'ENOENT') {
            return Err('CSV_ENOENT');
        }
        console.log(`❌ Unexpected issue at readLocal: ${err}`);
        return Err('CSV_EUNK');
    }
};
// delete the local csv data
const rmLocal = async () => {
    // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
    try {
        // delete the file
        await fsp.rm(`${csv_path}/${csv}`);
        return Ok.EMPTY;
    }
    catch (error) {
        // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48281
        // @see https://fettblog.eu/typescript-typing-catch-clauses
        const err = error;
        // @see https://nodejs.org/api/errors.html#class-systemerror
        if (err.code == 'ENOENT') {
            return Err('CSV_ENOENT');
        }
        console.log(`❌ Unexpected issue at rmLocal: ${err}`);
        return Err('CSV_EUNK');
    }
};
// access the local csv without opening it
const accessLocal = async () => {
    try {
        await fsp.access(`${csv_path}/${csv}`, fs.constants.F_OK);
        return Ok.EMPTY;
    }
    catch (error) {
        // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48281
        // @see https://fettblog.eu/typescript-typing-catch-clauses
        const err = error;
        // @see https://nodejs.org/api/errors.html#class-systemerror
        if (err.code == 'ENOENT') {
            return Err('CSV_ENOENT');
        }
        console.log(`❌ Unexpected issue at accessLocal: ${err}`);
        return Err('CSV_EUNK');
    }
};
const Dataset = async () => {
    // check if the .csv exists, if not download it from given URL
    const r1 = await readLocal();
    if (r1.ok) {
        return Ok(r1.val);
    }
    switch (r1.val) {
        case 'CSV_ENOENT':
            // download .csv from the internet
            return Ok('tmp');
        default:
            throw new UnreachableCaseError(r1.val);
    }
};
export { Dataset, readLocal, fetchExternal, rmLocal, csv, csv_path, accessLocal, };
