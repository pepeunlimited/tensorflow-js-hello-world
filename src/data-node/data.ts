import * as tf from '@tensorflow/tfjs-node'

type Human = {
  // feature
  xs: number,
  // label
  ys: number 
}

type Data = {
  dataset: tf.data.Dataset<tf.TensorContainer>
  numberOfColumns: number
}

const DatasetV1 = (): Data => {
  //const dataset: tf.TensorContainer[] = [names, ages, weight]
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
  //const names: any = [{ xs: "Simo", ys: "Name" }]
  //const ages = tf.tensor1d([32, 12, 29], 'int32')
  //const weight = tf.tensor1d([70, 2, 50], 'float32')
  //  const data: tf.TensorContainer[] = [
  //    1, 2, 3
  //  ]
  const data1: Human[] = [
    {
      xs: 1,
      ys: 1
    },
    {
      xs: 2,
      ys: 1
    }
  ]
  const dataset = tf.data.array(data1)
  return {
    dataset: dataset.map(row => {
      console.log(`dataset.row=${JSON.stringify(row)}`)
      const human: Human = row as Human
      return { xs: [human.xs], ys: [human.ys] }
    }),
    numberOfColumns: 1,
  }
}

export { DatasetV1, Data }
