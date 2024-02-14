//
//  Copyright 2023 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//

import * as tf from '@tensorflow/tfjs-node'
import { Sequential, Shape } from '@tensorflow/tfjs-node'

const CreateModel = (inputShape: Shape): Sequential => {
  const model = tf.sequential()
  model.add(tf.layers.dense({
    inputShape: inputShape,
    activation: 'sigmoid',
    units: 50,
  }))

  model.add(
    tf.layers.dense({
      activation: 'sigmoid',
      units: 50,
    }),
  )
  model.add(
    tf.layers.dense({
      units: 1,
    }),
  )
    
  model.compile({
    loss: 'meanSquaredError',
    optimizer: 'sgd',
  })
  return model
}

export { CreateModel }
