//
//  Copyright 2023 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//

import * as tf from '@tensorflow/tfjs-node'
import * as fsp from 'node:fs/promises'
import { Ok, Err, Result } from 'ts-results-es'

// MARK: BinanceKlines

type BinanceKlines = {
  open_time: number,                    // 1499040000000,      // Kline open time
  open_price: string,                   // "0.01634790",       // Open price
  high_price: string,                   // "0.80000000",       // High price
  low_price: string,                    // "0.01575800",       // Low price
  close_price: string,                  // "0.01577100",       // Close price
  volume: string,                       // "148976.11427815",  // Volume
  close_time: number,                   // 1499644799999,      // Kline Close time
  quote_asset_volume: string,           // "2434.19055334",    // Quote asset volume
  number_of_trades: number,             // 308,                // Number of trades
  taker_buy_base_asset_volume: string,  // "1756.87402397",    // Taker buy base asset volume
  taker_buy_quote_asset_volume: string, // "28.46694368",      // Taker buy quote asset volume
}

// MARK: Data

type Data = {
  dataset: tf.data.Dataset<tf.TensorContainer>
  // @see data-node/data.ts  > Object.keys(human) - sex
  // @see data-node/model.ts > inputShape & units
  // @see data-node/train.ts > CreateModel([data.numberOfColumns])
  numberOfColumns: number
}

// MARK: Constants

// curl "https://api.binance.com/api/v3/klines?startTime=1701388800000&interval=3m&symbol=BTCUSDT&limit=500" -o ~/github/tensorflow-js-hello-world/binance-klines-2023-12-01-0000.json

// filename for the klines json data
const json: string = 'binance-klines-2023-12-01-0000.json'
// file path for the klines json data
const json_path: string = '.'

type JSONError = 'JSON_ENOENT' | 'JSON_EUNK'

// MARK: Functions

type rmLocalParams = { json: string, json_path: string }

// remove the local json data
const rmLocal = async (params: Partial<rmLocalParams> = {}): Promise<Result<void, JSONError>> => {
  const p = Object.assign({
    json: json,
    json_path: json_path
  }, params)
  // @see https://rclayton.silvrback.com/easy-class-api-options-with-typescript-and-joi
  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
  try {
    // delete the file
    await fsp.rm(`${p.json_path}/${p.json}`)
    return Ok.EMPTY
  } catch (error) {
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48281
    // @see https://fettblog.eu/typescript-typing-catch-clauses
    const err = error as NodeJS.ErrnoException
    // @see https://nodejs.org/api/errors.html#class-systemerror
    if (err.code == 'ENOENT') {
      return Err('JSON_ENOENT')
    }
    console.log(`❌ Unexpected issue at rmLocal: ${error}`)
    return Err('JSON_EUNK')
  }
}

type readLocalParams = { json: string, json_path: string }

// access the local json data
const readLocal = async (params: Partial<readLocalParams> = {}): Promise<Result<BinanceKlines[], JSONError>> => {
  const p = Object.assign({
    json: json,
    json_path: json_path
  }, params)
  // @see https://blog.logrocket.com/improve-error-handling-typescript-exhaustive-type-checking/
  // @see https://github.com/nodejs/node/blob/master/doc/api/stream.md
  // @see https://github.com/nodejs/node/blob/main/doc/api/fs.md#class-fswritestream
  try {
    const data = await fsp.readFile(`${p.json_path}/${p.json}`, 'utf-8')
    const json_data = JSON.parse(data)
    var klines: BinanceKlines[] = []
    for (let result of json_data) {
      klines.push({
        open_time: result[0],
        open_price: result[1],
        high_price: result[2],
        low_price: result[3],
        close_price: result[4],
        volume: result[5],
        close_time: result[6],
        quote_asset_volume: result[7],
        number_of_trades: result[8],
        taker_buy_base_asset_volume: result[9],
        taker_buy_quote_asset_volume: result[10],
      })
    }
    return Ok(klines)
  } catch (error) {
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48281
    // @see https://fettblog.eu/typescript-typing-catch-clauses
    const err = error as NodeJS.ErrnoException
    // @see https://nodejs.org/api/errors.html#class-systemerror
    if (err.code == 'ENOENT') {
      return Err('JSON_ENOENT')
    }
    console.log(`❌ Unexpected issue at readLocal: ${error}`)
    return Err('JSON_EUNK')
  }
}

type DatasetParams = { json: string, json_path: string }

// access for the BinanceKlines dataset
const Dataset = async (params: Partial<DatasetParams> = {}): Promise<Result<Data, JSONError>> => {
  const p = Object.assign({
    json: json,
    json_path: json_path
  }, params)
  // expect json file exist
  const source = await readLocal(p)
  if (source.isErr()) {
    return Err(source.error)
  }
  const dataset = tf.data.array(source.unwrap()).map((value: BinanceKlines) => {
    return {
      xs: [value.open_time, value.close_time],
      ys: [
        Number(value.open_price),
        Number(value.close_price),
        Number(value.volume),
        Number(value.high_price),
        Number(value.low_price),
        Number(value.number_of_trades),
        Number(value.taker_buy_base_asset_volume),
        Number(value.taker_buy_quote_asset_volume),
        Number(value.quote_asset_volume)
      ]
    }
  })
  return Ok({
    dataset: dataset,
    numberOfColumns: 2
  })
}

export { json, json_path, readLocal, rmLocal, Dataset }
