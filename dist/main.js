"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tf = require("@tensorflow/tfjs-node");
const main = async () => {
    // create simple model
    const model = tf.sequential();
    model.add(tf.layers.dense({
        units: 1,
        inputShape: [1],
    }));
    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd',
    });
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
    const xs = tf.tensor2d([-3, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
    xs.print();
    ys.print();
    // Train the model using the data.
    await model.fit(xs, ys, {
        epochs: 250,
        callbacks: {
            onEpochEnd: (epoch, log) => {
                console.log(`Epoch ${epoch}: loss = ${log === null || log === void 0 ? void 0 : log.loss}`);
            },
        },
    });
};
main();
