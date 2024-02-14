//
//  Copyright 2023 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//

import * as tf from '@tensorflow/tfjs-node'
import { DatasetV1 } from "../data-node-prius/data.js"
import { CreateModel } from "./model.js"

const Run = async (): Promise<void> => {
  const data = DatasetV1()
  const model = CreateModel([data.numberOfColumns])
  // fit the dataset for tf
  const dataset = data.dataset.shuffle(12).batch(4)
  const trainDataset = dataset.take(2)
  const validationDataset = dataset.skip(2)

  await model.fitDataset(trainDataset, {
    epochs: 100,
    validationData: validationDataset
  })
  // stream - IOs - save & load models - native file system (node.js)
  //
  // notice: model.save pathOrIOHandler includes file:// protocol
  // without protocol tf throws: 'ValueError: Cannot find any save handlers for URL' expection
  const pathOrIOHandler: string = 'file://src/data-node-prius/model-v1'
  // stream output
  await model.save(pathOrIOHandler)
  // stream input
  const input = await tf.loadLayersModel(`${pathOrIOHandler}/model.json`)
  model.summary()
  input.summary()
  // predicate using saved model
  // @see https://stackoverflow.com/a/61369496/3913343
  const result = input.predict(tf.tensor2d([[0, 2024]])) as tf.Tensor
  console.log(`result: ${result.dataSync()}`)
}

export { Run }
