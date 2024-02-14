//
//  Copyright 2022 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//

import { default as fetch, Response } from 'node-fetch'
import * as tf from '@tensorflow/tfjs-node'
import * as fsp from 'node:fs/promises'
import * as fs from 'node:fs'
import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { Ok, Err, Result } from 'ts-results-es'
import { PanicError } from './panic_error.js'
import { differenceInCalendarQuarters, max, parse } from "date-fns";
import intervalToDuration from 'date-fns/esm/intervalToDuration/index'

// MARK: Constants

// filename for the weather csv data
const csv: string = 'jena_climate_2009_2016.csv'
// file path for the weather csv data
const csv_path: string = '.'

type CSVError = 'CSV_ENOENT' | 'CSV_EUNK' | 'CSV_'

// MARK: Features

type Features = {
  crim: number;
  zn: number;
  inus: number
}

// MARK: Labels

type Labels = {
  medv: number
}

// MARK: Data

type Data = {
  dataset: tf.data.Dataset<tf.TensorContainer>
  // @see data-node/data.ts  > Object.keys(human) - sex
  // @see data-node/model.ts > inputShape & units
  // @see data-node/train.ts > CreateModel([data.numberOfColumns])
  numberOfColumns: number

  normalized: any[]
}

// MARK: Functions

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
const CSVDataset = async (): Promise<Result<string | Buffer, CSVError>> => {
  // check if the .csv exists, if not download it from given URL
  const local = await readLocal()
  if (local.isOk()) {
    // return local bytes
    return Ok(local.value)
  }
  switch (local.error) {
    case 'CSV_ENOENT':
      // download .csv from the internet & save
      const external = await fetchExternal()
      if (external.isOk()) {
        const saved = await saveExternal(external.value.body!)
        if (saved.isErr()) {
          // check the error from saveExternal
          switch (saved.error) {
            default:
              throw new PanicError(saved.error)
          }
        }
        // read saved local .csv
        const savedLocal = await readLocal()
        // check the error from savedLocal
        if (savedLocal.isErr()) {
          throw new PanicError(savedLocal.error)
        }
        // return savedLocal bytes
        return Ok(savedLocal.value)
      }
      // check the error from fetchExternal
      switch (external.error) {
        default:
          throw new PanicError(external.error)
      }
    default:
      throw new PanicError(local.error)
  }
}

const scale = async (data: tf.data.Dataset<{ xs: any[], ys: any[] }>): Promise<{ means: number[], stddevs: number[] }> => {
  return tf.tidy(() => {

    let scale: { means: number[], stddevs: number[] } = {
      means: [],
      stddevs: []
    }

    data.forEachAsync((value) => {
      const tx = tf.tensor1d(value.xs)
      const momentsx = tf.moments(tx)

      scale.means.push(momentsx.mean.dataSync().at(0)!)
      scale.stddevs.push(momentsx.variance.sqrt().dataSync().at(0)!)
    })
    return scale
  })
}

const Dataset = async (): Promise<Result<Data, CSVError>> => {
  await CSVDataset()

  const data = tf.data.csv(`file://${csv_path}/${csv}`, {
    columnConfigs: {}
  })

  // take every 6's row
  const unnormalized = (await data.toArray()).filter((_, index) => {
    return index % 6 == 0
  })

  // prepare csv data for training
  const flattenedDataset = unnormalized.map((value: any) => {
    // @see https://stackoverflow.com/a/57785682
    // const { xs, ys } = value as { xs: any, ys: any }
    const datetime = value['Date Time']   // Date Time
    const p = value['p (mbar)']           // p (mbar)
    const t = value['T (degC)']           // T (degC)
    const tpot = value['Tpot (K)']        // Tpot (K)
    const tdew = value['Tdew (degC)']     // Tdew (degC)
    const rh = value['rh (%)']            // rh (%)
    const vpmax = value['VPmax (mbar)']   // VPmax (mbar)
    const vpact = value['VPact (mbar)']   // VPact (mbar)
    const vpdef = value['VPdef (mbar)']   // VPdef (mbar)
    const sh = value['sh (g/kg)']         // sh (g/kg)
    const h2oc = value['H2OC (mmol/mol)'] // H2OC (mmol/mol)
    const rho = value['rho (g/m**3)']     // rho g/m**3
    let wv = value['wv (m/s)']            // mv (m/s)
    let wvmax = value['max. wv (m/s)']    // max. wv (m/2)
    const wd = value['wd (deg)']          // wd (deg)

    // velocity should be greater than zero (>=0)
    if (wv == -9999.0) {
      wv = 0.0
    }

    // velocity should be greater than zero (>=0)
    if (wvmax == -9999.0) {
      wvmax = 0.0
    }

    // convert to radians => wd (deg)
    const wdrad = (wd * Math.PI) / 180

    // calculate the wind x and y components.
    const wx = wv * Math.cos(wdrad)
    const wy = wv * Math.sin(wdrad)

    // calculate the max wind x and y components.
    const wxmax = wvmax * Math.cos(wdrad)
    const wymax = wvmax * Math.sin(wdrad)

    // console.log(`${wx}, ${wy}, ${wxmax}, ${wymax}`)

    // date to seconds 01.01.2009 00:50:00
    const datetime_s = Math.round(parse(datetime, "dd.MM.yyyy HH:mm:ss", new Date()).getTime())

    // "Time of day" signals and "Time of year" signal
    const timeOfDay = 24 * 60 * 60
    const timeOfYear = (365.2425) * timeOfDay

    const daysin = Math.sin(datetime_s * (2 * Math.PI / timeOfDay))
    const daycos = Math.cos(datetime_s * (2 * Math.PI / timeOfDay))

    const yearsin = Math.sin(datetime_s * (2 * Math.PI / timeOfYear))
    const yearcos = Math.cos(datetime_s * (2 * Math.PI / timeOfYear))

    // console.log(`${daysin}, ${daycos}, ${yearsin}, ${yearcos}`)

    return {
      xs: [
        p,
        tdew,
        tpot,
        rh,
        vpmax,
        vpact,
        vpdef,
        sh,
        h2oc,
        rho,
        wx,
        wy,
        wxmax,
        wymax,
        daysin,
        daycos,
        yearsin,
        yearcos,
      ],
      ys: [
        t
      ]
    }
  })

  // scale => mean and stddev

  let scale: { means: number[], stddevs: number[] } = {
    means: [],
    stddevs: []
  }

  for (const value of flattenedDataset) {
    const tx = tf.tensor1d(value.xs)
    const momentsx = tf.moments(tx)
    scale.means.push(momentsx.mean.dataSync().at(0)!)
    scale.stddevs.push(momentsx.variance.sqrt().dataSync().at(0)!)
  }

  // await flattenedDataset.forEachAsync((value) => {
  //  const tx = tf.tensor1d(value.xs)
  //  const momentsx = tf.moments(tx)
  //  scale.means.push(momentsx.mean.dataSync().at(0)!)
  //  scale.stddevs.push(momentsx.variance.sqrt().dataSync().at(0)!)
  // })

  // normalize

  const numOfColumns: number = flattenedDataset[0].xs.length
  const numOfRows: number = flattenedDataset.length
  let normalized: { xs: any[] }[] = []

  for (var i = 0; i < numOfRows; i++) {
    const meanx: number = scale.means[i]
    const stddevx: number = scale.stddevs[i]
    const xs = []
    for (var j = 0; j < numOfColumns; j++) {
      xs.push((flattenedDataset[i].xs[j] - meanx) / stddevx)
    }
    normalized.push({ xs: xs })
  }

  //  const numOfColumns: number =  - 1
  //  let normalized: { xs: any[] }[] = []
  //  let i: number = 0
  //  await flattenedDataset.forEachAsync((value) => {
  //    const meanx: number = scale.means[i]
  //    const stddevx: number = scale.stddevs[i]
  //    const xs = []
  //    for (var j = 0; j < numOfColumns; j++) {
  //      xs.push((value.xs[j] - meanx) / stddevx)
  //    }
  //    normalized.push({ xs: xs })
  //    i++
  //  })

  // for (var i = 0; i < numOfRows; i++) {
  //   const meanx: number = scale.means[i]
  //   const stddevx: number = scale.stddevs[i]
  //   const xs = []
  //   for (var j = 0; j < numOfColumns; j++) {
  //     xs.push((a1[i].xs[j] - meanx) / stddevx)
  //   }
  //   normalized.push({ xs: xs })
  // }

  // const a2 = a1.filter((_, index) => {
  // return index % 6 == 0
  // })

  // let train = a1.slice(0, a2.length * 0.7)
  // let val = a1.slice(a2.length * 0.7, a2.length * 0.9)
  // let test = a1.slice(a2.length * 0.9, a2.length)

  // console.log(train.length)
  // console.log(val.length)
  // console.log(test.length)

  // const it = await data.iterator()
  // const xs = []
  // const ys = []
  // read only the data for the first 5 rows
  // all the data need not to be read once 
  // since it will consume a lot of memory
  // for (let i = 0; i < 5; i++) {
  //  let e = await it.next()
  //  xs.push(e.value.xs)
  //  ys.push(e.value.ys)
  // }
  // const features = tf.tensor(xs)
  // const labels = tf.tensor(ys)

  return Ok({
    dataset: data,
    numberOfColumns: numOfColumns,
    normalized: normalized
  })
}

type CreateWindowParams = {
  // The width (number of time steps) of the input and label windows.
  numberOfTimeSteps: number,
  width: number,
  // the time offset between them
  offset: number
  columns: string[]
  // shuffle Whether the data is to be shuffled. If `false`,
  // the examples generated by repeated calling of the returned iterator
  // function will scan through range specified by `minIndex` and `maxIndex`
  // (or the entire range of the CSV file if those are not specified) in a
  // sequential fashion. If `true`, the examples generated by the returned
  // iterator function will start from random rows.
  shuffle: boolean
  // lookBack Number of look-back time steps. This is how many 
  // steps to look back back when making a prediction. Typical value: 10 days
  // (i.e., 6 * 24 * 10 = 1440).
  lookBack: number
  // delay Number of time steps from the last time point in the
  // input features to the time of prediction. Typical value: 1 day (i.e.,
  // 6 * 24 = 144).
  delay: number
  // batchSize Batch size
  batchSize: number
  // step Number of steps between consecutive time points in the
  // input features. This is a downsampling factor for the input features.
  // Typical value: 1 hour (i.e., 6).
  step: number
  // Optional minimum index to draw from the original
  // data set. Together with `maxIndex`, this can be used to reserve a chunk
  // of the original data for validation or evaluation.
  minIndex: number
  // maxIndex Optional maximum index to draw from the original
  // data set. Together with `minIndex`, this can be used to reserve a chunk
  // of the original data for validation or evaluation.
  maxIndex: number
  // includeDateTime Include the date-time features, including
  // normalized day-of-the-year and normalized time-of-the-day.
  dateTime: boolean

  data: Data
}

// An iterator Function, which returns a batch of features
// and targets when invoked. The features and targets are arranged in a
// length-2 array, in the said order.
// The features are represented as a float32-type `tf.Tensor` of shape
// `[batchSize, Math.floor(lookBack / step), featureLength]`
// The targets are represented as a float32-type `tf.Tensor` of shape
// `[batchSize, 1]`.
const CreateWindow = (params: Partial<CreateWindowParams> = {}): Iterator<tf.TensorContainer> => {
  const p = Object.assign({
    numberOfTimeSteps: 24,
    width: 24,
    offset: 24,
    columns: ['T (degC)'],
    shuffle: false,
    lookBack: 1440,
    delay: 144,
    batchSize: 32,
    step: 1,
    minIndex: 0,
    maxIndex: 10000,
    dateTime: true,
    data: {
      dataset: [],
      numberOfColumns: 1,
      normalized: []
    }
  }, params)
  // true, 1000, 100, 32, 10, 0, 10000, true, false
  // const totalWindowSize: number = p.numberOfTimeSteps + p.offset
  // const inputSlice = Array.from(Array(p.numberOfTimeSteps).keys())
  // const labelIndices = inputSlice[inputSlice.length - 1] + p.numberOfTimeSteps
  // console.log(`totalWindow: ${totalWindowSize}\ninputSlice: ${inputSlice}\nlabelIndices: ${labelIndices}`)
  let startIndex: number = p.minIndex + p.lookBack
  const lookBackSlices = Math.floor(p.lookBack / p.step)
  console.log(`startIndex: ${startIndex} lookBackSlices: ${lookBackSlices}`)
  const iterator = {
    next: (): IteratorResult<tf.TensorContainer> => {
      let done = false
      const rows = []
      let i: number = startIndex
      
      for (; i < startIndex + p.batchSize && i < p.maxIndex; i++) {
        rows.push(i)
      }
      if (i >= p.maxIndex) {
        done = true
      }
      
      const numExamples: number = rows.length
      startIndex += numExamples
      console.log(`rows: ${rows}\nnumExamples: ${numExamples}\nstartIndex: ${startIndex}`)
      
      const samples = tf.buffer([numExamples, lookBackSlices, p.data.numberOfColumns])
      const targets = tf.buffer([numExamples, 1])
      
      return {
        value: { xs: [], ys: [] },
        done: done
      }
    }
  }
  return iterator
}


export {
  Dataset,
  CSVDataset,
  readLocal,
  fetchExternal,
  saveExternal,
  rmLocal,
  csv,
  csv_path,
  CSVError,
  accessLocal,
  CreateWindow
}
