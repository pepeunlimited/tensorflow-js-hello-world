import * as tf from '@tensorflow/tfjs-node'
import { source, Human } from './source.js'

type Data = {
  dataset: tf.data.Dataset<tf.TensorContainer>
  // @see data-node/data.ts  > Object.keys(human) - sex
  // @see data-node/model.ts > inputShape & units
  // @see data-node/train.ts > CreateModel([data.numberOfColumns])
  numberOfColumns: number
}

const DatasetV1 = (): Data => {
  // const dataset: tf.TensorContainer[] = [sex, ages]
  // model.fitDataset expects are a Dataset,
  // each element inside this dataset is
  // a tuple of two items:
  //
  // [feature, label]
  //
  // xs: -> xVal -> convertedFeatures
  // ys: -> yVal -> convertedLabel
  //
  // {xs: convertedFeatures, ys: convertedLabel}
  // const data: tf.TensorContainer[] = [
  //   1, 2, 3
  // ]
  //
  // const xs = Object.fromEntries(['age', 'weight', 'height'].map(k => [k, human[k as keyof typeof human]]))
  const dataset: tf.data.Dataset<Human> = tf.data.array(source)
  return {
    dataset: dataset.map((row) => {
      const human: Human = row as Human

      // NOTICE:
      // with tf.data.csv you should use for FEATURE(xs) and LABEL(ys)
      // const xs = row['xs']
      // const ys = row['ys']

      // filter age out of the human row
      const xs = Object.keys(human)
        .filter((k) => !k.includes('age'))
        .map((k) => {
          const value = human[k as keyof typeof human]
          // typecast sex M(0) F(1)
          switch (k) {
            case 'sex':
              switch (value) {
                case 'M':
                  return 0
                case 'F':
                  return 1
                default:
                  return -1
              }
            default:
              return value
          }
        })

      // filter age in of the human row
      const ys = Object.keys(human)
        .filter((k) => k.includes('age'))
        .map((k) => human[k as keyof typeof human])

      console.log(`dataset.row: ${JSON.stringify(row)}, xs: ${xs}, ys: ${ys}`)
      return { xs: xs, ys: ys }
    }),
    numberOfColumns: 3, // @see Data.numberOfColumns
  }
}

export { DatasetV1, Data }
