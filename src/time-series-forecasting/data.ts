//import fetch from 'node-fetch'
import { default as fetch } from 'node-fetch';
import * as fs from 'node:fs/promises'

// filename for the weather csv data
const csv: string = 'jena_climate_2009_2016.csv'

// type for the JenaWeather
type JenaWeather = {}

type Error = 'CANT_FETCH_LOCAL_CSV' | 'CANT_FETCH_EXTERNAL_CSV'

// access for the external csv data
const fetchExternal = async (): Promise<void> => {
  // url for the external download
  const endpointURL: string = `https://storage.googleapis.com/learnjs-data/jena_climate/${csv}`
  const fetched = await fetch(endpointURL)

  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
}

// access the local csv data
const fetchLocal = async (): Promise<void> => {
  // path for local
  const path: string = `./${csv}`

  // @see https://github.com/nodejs/node/blob/master/doc/api/stream.md
  // @see https://github.com/nodejs/node/blob/main/doc/api/fs.md#class-fswritestream

  await fs.readFile(path, 'utf-8')

  // const fetched = await fetch(path)

  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
}

const Dataset = async (): Promise<JenaWeather> => {
  // check if the .csv exists, if not download it from given URL
  await fetchLocal()
  await fetchExternal()
  return {}
}

export { JenaWeather, Dataset, fetchLocal, fetchExternal }
