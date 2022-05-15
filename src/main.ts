import * as tf from '@tensorflow/tfjs-node'
import { Logs } from '@tensorflow/tfjs-layers'

const main = async (): Promise<void> => {
  // create simple model
  const model = tf.sequential()
  model.add(
    tf.layers.dense({
      units: 1,
      inputShape: [1],
    })
  )
  // Prepare the model for training: Specify the loss and the optimizer.
  model.compile({
    loss: 'meanSquaredError',
    optimizer: 'sgd',
  })
  // Generate some synthetic data for training. (y = 2x - 1)
  //
  // The central unit of data in TensorFlow.js is the tf.Tensor: a set of values
  // shaped into an array of one or more dimensions.
  // tf.Tensors are very similar to multidimensional arrays.
  //
  // A tf.Tensor also contains the following properties:
  //  - rank: defines how many dimensions the tensor contains
  //  - shape: which defines the size of each dimension of the data
  //  - dtype: which defines the data type of the tensor.
  //
  // Note: We will use the term "dimension" interchangeably with the rank.
  // Sometimes in machine learning, "dimensionality" of a tensor can also refer to the size of a
  // particular dimension (e.g. a matrix of shape [10, 5] is a rank-2 tensor, or a 2-dimensional tensor.
  // The dimensionality of the first dimension is 10. This can be confusing,
  // but we put this note here because you will likely come across these dual uses of the term).
  //
  // A tf.Tensor can be created from an array with the tf.tensor() method:
  const xs = tf.tensor2d([-3, 0, 1, 2, 3, 4], [6, 1])
  const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1])
  xs.print()
  ys.print()
  // By default, tf.Tensors will have a float32 dtype.
  // tf.Tensors can also be created with bool, int32, complex64, and string dtypes:
  // const xs = tf.tensor2d([1, 2, 3, 4, 5, 6], [1, 2], 'int32')
  //
  // TensorFlow.js also provides a set of convenience methods for creating random tensors,
  // tensors filled with a particular value, tensors from HTMLImageElements,
  // and many more which you can find:
  // @see https://js.tensorflow.org/api/latest/#Tensors-Creation

  // Train the model using the data.

  await model.fit(xs, ys, {
    epochs: 250,
    callbacks: {
      onEpochEnd: (epoch: number, log: Logs | undefined) => {
        console.log(`Epoch ${epoch}: loss = ${log?.loss}`)
      },
    },
  })
}

main()
