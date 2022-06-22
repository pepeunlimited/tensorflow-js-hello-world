import * as tf from '@tensorflow/tfjs-node'
import { DatasetV1 } from './data'
import { CreateModel } from './model'

const Run = async (): Promise<void> => {
  const data = DatasetV1()
  const model = CreateModel([data.numberOfColumns])
  // dataset.count:  12
  // shuffle: 12/2 = 6
  // batch:          4
  // take:           2
  // skip:           2
  const dataset = data.dataset.shuffle(6).batch(4)
  const trainDataset = dataset.take(2)
  const validationDataset = dataset.skip(2)

  await model.fitDataset(trainDataset, {
    epochs: 100,
    validationData: validationDataset
  })
  
  // Stream - Input Output
  //
  // notice: model.save handlerOrURL includes file:// protocol
  // without protocol tf throws: 'ValueError: Cannot find any save handlers for URL' expection
  const handlerOrURL: string = 'file://src/data-node/model-v1'
  // stream output
  await model.save(handlerOrURL)
  // stream input
  const input = await tf.loadLayersModel(`${handlerOrURL}/model.json`);
  // predicate using saved model
  // @see https://stackoverflow.com/a/61369496/3913343
  const result = input.predict(tf.tensor2d([[1, 8, 160]])) as tf.Tensor
  console.log(`result: ${result.dataSync()}`)
  // io-stream:
  // read more about input and output streams:
  // @see https://github.com/nodejs/node/blob/master/doc/api/stream.md
}

export { Run }
