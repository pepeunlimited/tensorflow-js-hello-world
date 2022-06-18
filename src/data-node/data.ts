import * as tf from '@tensorflow/tfjs-node'

type XY = {
  // sex of the given object (feature)
  // male    = 0
  // female  = 1 
  xs: number
  // age of the given object (label)
  ys: number
}

type Data = {
  dataset: tf.data.Dataset<tf.TensorContainer>
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
  const data1: XY[] = [
    {
      xs: 1,
      ys: 58,
    },
    {
      xs: 1,
      ys: 88,
    },
    {
      xs: 0,
      ys: 44,
    },
  ]
  const dataset: tf.data.Dataset<XY> = tf.data.array(data1)
  return {
    dataset: dataset.map((row) => {
      console.log(`dataset.row=${JSON.stringify(row)}`)
      const xy: XY = row as XY
      return { xs: [xy.xs], ys: [xy.ys] }
    }),
    numberOfColumns: 1, // @see data-node/model.ts inputShape & units
  }
}

export { DatasetV1, Data }
