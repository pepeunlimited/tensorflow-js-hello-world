import { default as fetch } from 'node-fetch';
import * as fs from 'node:fs/promises';
import { Ok, Err } from 'ts-results';
// filename for the weather csv data
const csv = 'jena_climate_2009_2016.csv';
// access for the external csv data
const fetchExternal = async () => {
    // url for the external download
    const endpointURL = `https://storage.googleapis.com/learnjs-data/jena_climate/${csv}`;
    const fetched = await fetch(endpointURL);
    // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
};
// access the local csv data
const readLocal = async () => {
    // path for local
    const path = `./${csv}`;
    // @see https://github.com/nodejs/node/blob/master/doc/api/stream.md
    // @see https://github.com/nodejs/node/blob/main/doc/api/fs.md#class-fswritestream
    await fs.readFile(path, 'utf-8');
    // const fetched = await fetch(path)
    // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
};
// delete local file
const rmLocal = async () => {
    try {
        // path for local
        const path = `./${csv}`;
        // delete the file
        await fs.rm(path);
        return Ok.EMPTY;
    }
    catch (error) {
        console.log(error);
        return Err('LOCAL_CSV_NOT_EXIST');
    }
};
const Dataset = async () => {
    // check if the .csv exists, if not download it from given URL
    await readLocal();
    await fetchExternal();
    return {};
};
export { Dataset, readLocal, fetchExternal, rmLocal };
