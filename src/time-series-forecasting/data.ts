import * as tf from '@tensorflow/tfjs-node'
import { Ok, Err, Result } from 'ts-results'
import fetch from 'node-fetch'

// filename for the weather csv data
const csv: string = 'jena_climate_2009_2016.csv'

// type for the JenaWeather
type JenaWeather = {}

type Error = 'CANT_FETCH_LOCAL_CSV' | 'CANT_FETCH_EXTERNAL_CSV'

// access for the external csv data
const external = async (): Promise<void> => {
  // url for the external download
  const endpointURL: string = `https://storage.googleapis.com/learnjs-data/jena_climate/${csv}`

  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
}

// access the local csv data
const local = async (): Promise<void> => {
  // path for local
  const path: string = `./${csv}`
  const file = await fetch(path)

  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
}

const Dataset = async (): Promise<JenaWeather> => {
  // check if the .csv exists, if not download it from given URL
  await local()
  await external()
  return {}
}

export { JenaWeather, Dataset }
