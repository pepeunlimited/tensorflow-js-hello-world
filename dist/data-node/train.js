"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Run = void 0;
const tf = require("@tensorflow/tfjs-node");
const data_1 = require("./data");
const model_1 = require("./model");
const Run = async () => {
    const data = (0, data_1.DatasetV1)();
    const model = (0, model_1.CreateModel)([data.numberOfColumns]);
    // dataset.count:  12
    // shuffle: 12/2 = 6
    // batch:          4
    // take:           2
    // skip:           2
    const dataset = data.dataset.shuffle(12).batch(4);
    const trainDataset = dataset.take(2);
    const validationDataset = dataset.skip(2);
    // fit the dataset for tf
    await model.fitDataset(trainDataset, {
        epochs: 100,
        validationData: validationDataset,
    });
    // stream - IOs - save & load models - native file system (node.js)
    //
    // notice: model.save pathOrIOHandler includes file:// protocol
    // without protocol tf throws: 'ValueError: Cannot find any save handlers for URL' expection
    const pathOrIOHandler = 'file://src/data-node/model-v1';
    // stream output
    await model.save(pathOrIOHandler);
    // stream input
    const input = await tf.loadLayersModel(`${pathOrIOHandler}/model.json`);
    model.summary();
    input.summary();
    // predicate using saved model
    // @see https://stackoverflow.com/a/61369496/3913343
    const result = input.predict(tf.tensor2d([[1, 8, 160]]));
    console.log(`result: ${result.dataSync()}`);
    // io-stream:
    // read more about input and output streams:
    // @see https://github.com/nodejs/node/blob/master/doc/api/stream.md
};
exports.Run = Run;
