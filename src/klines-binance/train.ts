//
//  Copyright 2023 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//

import * as tf from '@tensorflow/tfjs-node'
import { Dataset } from './data.js'
import { CreateModel } from './model.js'

const Run = async (): Promise<void> => {
  const data = await Dataset()
  const model = CreateModel([data.unwrap().numberOfColumns])
  // dataset.count:  12
  // shuffle: 12/2 = 6
  // batch:          4
  // take:           2
  // skip:           2
  const dataset = data.unwrap().dataset.shuffle(512).batch(256)
  const trainDataset = dataset.take(128)
  const validationDataset = dataset.skip(2)
  // fit the dataset for tf
  await model.fitDataset(trainDataset, {
    epochs: 100,
    validationData: validationDataset,
  })
  // stream - IOs - save & load models - native file system (node.js)
  //
  // notice: model.save pathOrIOHandler includes file:// protocol
  // without protocol tf throws: 'ValueError: Cannot find any save handlers for URL' expection
  const pathOrIOHandler: string = 'file://src/klines-binance/model-v1'
  // stream output
  await model.save(pathOrIOHandler)
  // stream input
  const input = await tf.loadLayersModel(`${pathOrIOHandler}/model.json`)
  model.summary()
  input.summary()
  // predicate using saved model
  // @see https://stackoverflow.com/a/61369496/3913343
  const result = input.predict(tf.tensor2d([[1701568799999, 1701568860000]])) as tf.Tensor
  console.log(`result: ${result.dataSync()}`)
  // io-stream:
  // read more about input and output streams:
  // @see https://github.com/nodejs/node/blob/master/doc/api/stream.md
}

export { Run }
