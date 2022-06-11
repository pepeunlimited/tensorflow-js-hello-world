
import { DatasetV1 } from './data'
import { CreateModel } from './model'

const Run = async (): Promise<void> => {
  const data = DatasetV1()
  const model = CreateModel([data.numberOfColumns])
  
  const trainBatches = data.dataset.batch(2)
  await model.fitDataset(trainBatches, {
    epochs: 2
  })
  // read more about input and output streams:
  // @see https://github.com/nodejs/node/blob/master/doc/api/stream.md
}

export { Run }
