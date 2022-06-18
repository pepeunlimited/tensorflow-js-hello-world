"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetV1 = void 0;
const tf = require("@tensorflow/tfjs-node");
const DatasetV1 = () => {
    // const dataset: tf.TensorContainer[] = [sex, ages]
    // model.fitDataset expects are a Dataset,
    // each element inside this dataset is
    // a tuple of two items:
    //
    // [feature, label]
    //
    // xs: -> xVal -> convertedFeatures
    // ys: -> yVal -> convertedLabel
    //
    // {xs: convertedFeatures, ys: convertedLabel}
    // const data: tf.TensorContainer[] = [
    //   1, 2, 3
    // ]
    const data1 = [
        {
            xs: 1,
            ys: 58,
        },
        {
            xs: 1,
            ys: 88,
        },
        {
            xs: 0,
            ys: 44,
        },
    ];
    const dataset = tf.data.array(data1);
    return {
        dataset: dataset.map((row) => {
            console.log(`dataset.row=${JSON.stringify(row)}`);
            const xy = row;
            return { xs: [xy.xs], ys: [xy.ys] };
        }),
        numberOfColumns: 1, // @see data-node/model.ts inputShape & units
    };
};
exports.DatasetV1 = DatasetV1;
