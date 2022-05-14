import * as tf from '@tensorflow/tfjs-node'

const run = (): void => {
  // create simple model
  const model = tf.sequential()
  model.add(
    tf.layers.dense({
      units: 1,
      inputShape: [1],
    })
  )
}

run()
