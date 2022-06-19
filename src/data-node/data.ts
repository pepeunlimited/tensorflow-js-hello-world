import * as tf from '@tensorflow/tfjs-node'

type Sex = 'M' | 'F'

type Human = {
  // sex of the given object (tf.label)
  sex: Sex
  // age of the given object (tf.feature)
  age: number
  // weight of the given object (tf.feature)
  weight: number
  // height of the given object (tf.feature)
  height: number
}

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
  // const xs = Object.keys(human).map((key) => {
  // const value = human[key as keyof typeof human]
  // switch (key) {
  // case 'sex':
  // switch (value) {
  // case 'M':
  // return 0
  // case 'F':
  // return 1
  // default:
  // return -1
  // }
  // default:
  // return value
  // }
  // })
  //
  // const xs = Object.fromEntries(['age', 'weight', 'height'].map(k => [k, human[k as keyof typeof human]]))

  const data: Human[] = [
    {
      sex: 'M',
      age: 30,
      weight: 70,
      height: 180,
    },
    {
      sex: 'F',
      age: 28,
      weight: 60,
      height: 179,
    },
    {
      sex: 'F',
      age: 25,
      weight: 50,
      height: 169,
    },
  ]

  const dataset: tf.data.Dataset<Human> = tf.data.array(data)
  return {
    dataset: dataset.map((row) => {
      console.log(`dataset.row=${JSON.stringify(row)}`)
      const human: Human = row as Human
      
      // NOTICE:
      // with tf.data.csv you should use for FEATURE(xs) and LABEL(ys)
      // const xs = row['xs'] 
      // const ys = row['ys']

      // filter sex out of the human row
      const xs = Object.keys(human)
        .filter((k) => !k.includes('sex'))
        .map((k) => human[k as keyof typeof human])
      // filter sex in of the human row
      const ys = Object.keys(human)
        .filter((k) => k.includes('sex'))
        .map((k) => {
          // typecast sex M(0) F(1)
          const sex = human[k as keyof typeof human]
          switch (sex) {
            case 'M':
              return 0
            case 'F':
              return 1
            default:
              return -1
          }
        })
      return { xs: xs, ys: ys }
    }),
    numberOfColumns: 3, // @see Data.numberOfColumns
  }
}

export { DatasetV1, Data, Human, Sex }
