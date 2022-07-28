import { default as fetch, Response } from 'node-fetch'
import * as fsp from 'node:fs/promises'
import * as fs from 'node:fs'
import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { Ok, Err, Result } from 'ts-results'
import { PanicError } from './panic_error.js'

// filename for the weather csv data
const csv: string = 'jena_climate_2009_2016.csv'
// file path for the weather csv data
const csv_path: string = '.'

type CSVError = 'CSV_ENOENT' | 'CSV_EUNK' |  'CSV_'

type DatasetError = 'CANT_FETCH_EXTERNAL_CSV'

// access for the external csv data
const fetchExternal = async (): Promise<Result<Response, CSVError>> => {
  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
  // url for the external download
  try {
    const fetched: Response = await fetch(
      `https://storage.googleapis.com/learnjs-data/jena_climate/${csv}`,
    )
    return Ok(fetched)
  } catch (error) {
    // @see https://github.com/node-fetch/node-fetch/blob/main/docs/ERROR-HANDLING.md
    console.log(`❌ Unexpected issue at fetchExternal: ${error}`)
    return Err('CSV_EUNK')
  }
}

//
const saveExternal = async (bytes: NodeJS.ReadableStream): Promise<Result<void, CSVError>> => {
  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
  // @see https://blog.logrocket.com/working-node-js-streams/#transform-streams
  // @see https://gist.github.com/joyrexus/10026630
  // @see https://github.com/nodejs/help/issues/1076
  // @see https://blog.appsignal.com/2022/02/02/use-streams-to-build-high-performing-nodejs-applications.html
  // @see https://nodejs.org/api/stream.html#transform_transformchunk-encoding-callback
  try {
    const progress = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, chunk)
      },
    })
    await pipeline(bytes, progress, fs.createWriteStream(`${csv_path}/${csv}`, 'utf-8'))
    return Ok.EMPTY
  } catch (error) {
    console.log(`❌ Unexpected issue at saveExternal: ${error}`)
    return Err('CSV_EUNK')
  }
}

// access the local csv data
const readLocal = async (): Promise<Result<string | Buffer, CSVError>> => {
  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
  // @see https://github.com/nodejs/node/blob/master/doc/api/stream.md
  // @see https://github.com/nodejs/node/blob/main/doc/api/fs.md#class-fswritestream
  try {
    const file = await fsp.readFile(`${csv_path}/${csv}`, 'utf-8')
    return Ok(file)
  } catch (error) {
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48281
    // @see https://fettblog.eu/typescript-typing-catch-clauses
    const err = error as NodeJS.ErrnoException
    // @see https://nodejs.org/api/errors.html#class-systemerror
    if (err.code == 'ENOENT') {
      return Err('CSV_ENOENT')
    }
    console.log(`❌ Unexpected issue at readLocal: ${error}`)
    return Err('CSV_EUNK')
  }
}

// delete the local csv data
const rmLocal = async (): Promise<Result<void, CSVError>> => {
  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
  try {
    // delete the file
    await fsp.rm(`${csv_path}/${csv}`)
    return Ok.EMPTY
  } catch (error) {
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48281
    // @see https://fettblog.eu/typescript-typing-catch-clauses
    const err = error as NodeJS.ErrnoException
    // @see https://nodejs.org/api/errors.html#class-systemerror
    if (err.code == 'ENOENT') {
      return Err('CSV_ENOENT')
    }
    console.log(`❌ Unexpected issue at rmLocal: ${error}`)
    return Err('CSV_EUNK')
  }
}

// access the local csv without opening it
const accessLocal = async (): Promise<Result<void, CSVError>> => {
  try {
    await fsp.access(`${csv_path}/${csv}`, fs.constants.F_OK)
    return Ok.EMPTY
  } catch (error) {
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48281
    // @see https://fettblog.eu/typescript-typing-catch-clauses
    const err = error as NodeJS.ErrnoException
    // @see https://nodejs.org/api/errors.html#class-systemerror
    if (err.code == 'ENOENT') {
      return Err('CSV_ENOENT')
    }
    console.log(`❌ Unexpected issue at accessLocal: ${error}`)
    return Err('CSV_EUNK')
  }
}

// access for the JenaWeather dataset
const Dataset = async (): Promise<Result<string | Buffer, CSVError>> => {
  // check if the .csv exists, if not download it from given URL
  const local = await readLocal()
  if (local.ok) {
    // return local bytes
    return Ok(local.val)
  }
  switch (local.val) {
    case 'CSV_ENOENT':
      // download .csv from the internet & save
      const external = await fetchExternal()
      if (external.ok) {
        const saved = await saveExternal(external.val.body)
        if (saved.err) {
          // check the error from saveExternal
          switch (saved.val) {
            default:
              throw new PanicError(saved.val)
          }
        }
        // read saved local .csv
        const savedLocal = await readLocal()
        // check the error from savedLocal
        if (savedLocal.err) {
          throw new PanicError(savedLocal.val)
        }
        // return savedLocal bytes
        return Ok(savedLocal.val)
      }
      // check the error from fetchExternal
      switch (external.val) {
        default:
          throw new PanicError(external.val)
      }
    default:
      throw new PanicError(local.val)
  }
}

export {
  Dataset,
  readLocal,
  fetchExternal,
  rmLocal,
  csv,
  csv_path,
  CSVError,
  accessLocal,
}
