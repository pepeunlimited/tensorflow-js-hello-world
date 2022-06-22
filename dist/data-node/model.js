"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModel = void 0;
const tf = require("@tensorflow/tfjs-node");
const CreateModel = (inputShape) => {
    const model = tf.sequential();
    //  Multi Layer Perceptron Regression Model
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
exports.CreateModel = CreateModel;
