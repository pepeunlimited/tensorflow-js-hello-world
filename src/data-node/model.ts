import * as tf from '@tensorflow/tfjs-node'
import { Sequential, Shape } from '@tensorflow/tfjs-node'

const CreateModel = (inputShape: Shape): Sequential => {
  const model = tf.sequential()
  model.add(
    tf.layers.dense({
      inputShape: inputShape, // @see data-note/train.ts CreateModel & data-node/data.ts (numberOfColumns)
      units: 1,
    })
  )
  model.compile({
    loss: 'meanSquaredError',
    optimizer: 'sgd',
  })
  return model
}

export { CreateModel }
