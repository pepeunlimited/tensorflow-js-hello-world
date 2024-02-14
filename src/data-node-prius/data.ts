//
//  Copyright 2023 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//

import * as tf from '@tensorflow/tfjs-node'
import { Car, source } from './source.js'

type Data = {
  dataset: tf.data.Dataset<tf.TensorContainer>
  numberOfColumns: number
}

const DatasetV1 = (): Data => {
  const dataset = tf.data.array(source).map((value: Car) => {
    return { xs: [value.age, value.milage], ys: [value.price]}
  })
  return {
    // Features (xs)
    // A feature is an **input** variable—the x variable in simple linear regression.
    // A simple machine learning project might use a single feature, while a more sophisticated
    // machine learning project could use millions of features, specified as:\
    // In the spam detector example, the features could include the following:
    // words in the email text
    // sender's address
    // time of day the email was sent
    // email contains the phrase "one weird trick."
    // 
    // Labels (ys)
    // A label is the thing we're **predicting—the** y variable in simple linear regression.
    // The label could be the future price of wheat, the kind of animal shown in a picture,
    // the meaning of an audio clip, or just about anything.
    // @see https://developers.google.com/machine-learning/crash-course/framing/ml-terminology

    dataset: dataset,
    numberOfColumns: 2
  }
}

export { DatasetV1 }
