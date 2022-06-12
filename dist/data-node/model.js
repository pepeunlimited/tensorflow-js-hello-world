"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModel = void 0;
const tf = require("@tensorflow/tfjs-node");
const CreateModel = (inputShape) => {
    const model = tf.sequential();
    model.add(tf.layers.dense({
        inputShape: inputShape,
        units: 1,
    }));
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd',
    });
    return model;
};
exports.CreateModel = CreateModel;
