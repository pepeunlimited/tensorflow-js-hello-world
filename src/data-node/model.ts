//
//  Copyright 2022 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//

import * as tf from '@tensorflow/tfjs-node'
import { Sequential, Shape } from '@tensorflow/tfjs-node'

const CreateModel = (inputShape: Shape): Sequential => {
  const model = tf.sequential()
  // @see https://blog.tensorflow.org/2018/06/getting-started-with-tensorflowjs.html
  // multi-layer-perceptron-regression-model
  model.add(
    tf.layers.dense({
      inputShape: inputShape, // @see data-note/train.ts CreateModel & data-node/data.ts (numberOfColumns)
      activation: 'sigmoid',
      units: 50,
    }),
  )
  model.add(
    tf.layers.dense({
      activation: 'sigmoid',
      units: 50,
    }),
  )
  model.add(
    tf.layers.dense({
      activation: 'linear',
      units: 50,
    }),
  )
  
  model.compile({
    loss: 'meanSquaredError',
    optimizer: 'sgd',
  })
  return model
}

export { CreateModel }
