import * as tf from '@tensorflow/tfjs-node';
const CreateModel = (inputShape) => {
    const model = tf.sequential();
    // @see https://blog.tensorflow.org/2018/06/getting-started-with-tensorflowjs.html
    // multi-layer-perceptron-regression-model
    model.add(tf.layers.dense({
        inputShape: inputShape,
        activation: 'sigmoid',
        units: 50,
    }));
    model.add(tf.layers.dense({
        activation: 'sigmoid',
        units: 50,
    }));
    model.add(tf.layers.dense({
        units: 1,
    }));
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd',
    });
    return model;
};
export { CreateModel };
