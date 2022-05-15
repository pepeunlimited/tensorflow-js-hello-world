"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tf = require("@tensorflow/tfjs-node");
const run = async () => {
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
    const xs = tf.tensor2d([-3, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
    // Train the model using the data.
    await model.fit(xs, ys, {
        epochs: 250,
        callbacks: {
            onEpochEnd: (epoch, log) => {
                console.log(`Epoch ${epoch}: loss = ${log.loss}`);
            },
        },
    });
};
run();