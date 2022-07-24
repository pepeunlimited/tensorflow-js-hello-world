import { default as fetch } from 'node-fetch'
import * as fs from 'node:fs/promises'
import { Ok, Err, Result } from 'ts-results'

// filename for the weather csv data
const csv: string = 'jena_climate_2009_2016.csv'
// file path for the weather csv data
const csv_path: string = '.'

// type for the JenaWeather
type JenaWeather = {}

type DataError =
  | 'LOCAL_CSV_NOT_EXIST'
  | 'UNKNOWN_LOCAL_CSV_ERROR'
  | 'CANT_FETCH_EXTERNAL_CSV'

// access for the external csv data
const fetchExternal = async (): Promise<void> => {
  // url for the external download
  const endpointURL: string = `https://storage.googleapis.com/learnjs-data/jena_climate/${csv}`
  const fetched = await fetch(endpointURL)

  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
}

// access the local csv data
const readLocal = async (): Promise<Result<string | Buffer, DataError>> => {
  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
  // @see https://github.com/nodejs/node/blob/master/doc/api/stream.md
  // @see https://github.com/nodejs/node/blob/main/doc/api/fs.md#class-fswritestream
  try {
    const file = await fs.readFile(`${csv_path}/${csv}`, 'utf-8')
    return Ok(file)
  } catch (error) {
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48281
    // @see https://fettblog.eu/typescript-typing-catch-clauses
    const err = error as NodeJS.ErrnoException
    // @see https://nodejs.org/api/errors.html#class-systemerror
    if (err.code == 'ENOENT') {
      return Err('LOCAL_CSV_NOT_EXIST')
    }
    console.log(`Unexpected issue at readLocal: ${err}`)
    return Err('UNKNOWN_LOCAL_CSV_ERROR')
  }
}

// delete local file
const rmLocal = async (): Promise<Result<void, DataError>> => {
  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
  try {
    // delete the file
    await fs.rm(`${csv_path}/${csv}`)
    return Ok.EMPTY
  } catch (error) {
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48281
    // @see https://fettblog.eu/typescript-typing-catch-clauses
    const err = error as NodeJS.ErrnoException
    // @see https://nodejs.org/api/errors.html#class-systemerror
    if (err.code == 'ENOENT') {
      return Err('LOCAL_CSV_NOT_EXIST')
    }
    console.log(`Unexpected issue at rmLocal: ${err}`)
    return Err('UNKNOWN_LOCAL_CSV_ERROR')
  }
}

const Dataset = async (): Promise<JenaWeather> => {
  // check if the .csv exists, if not download it from given URL
  await readLocal()
  await fetchExternal()
  return {}
}

export { JenaWeather, Dataset, readLocal, fetchExternal, rmLocal }
