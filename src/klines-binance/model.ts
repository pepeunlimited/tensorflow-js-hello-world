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
    activation: 'tanh',
    units: 9
  }))
  
  model.add(tf.layers.dense({
    activation: 'tanh',
    units: 27
  }))
  model.add(tf.layers.dense({
    activation: 'sigmoid',
    units: 9
  }))

  model.compile({
    loss: 'meanSquaredError',
    optimizer: 'adadelta',
    metrics: ['accuracy']
  })
  return model
}

export { CreateModel }
