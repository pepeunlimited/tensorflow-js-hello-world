"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Run = void 0;
const data_1 = require("./data");
const model_1 = require("./model");
const Run = async () => {
    const data = (0, data_1.DatasetV1)();
    const model = (0, model_1.CreateModel)([data.numberOfColumns]);
    const trainBatches = data.dataset.batch(2);
    await model.fitDataset(trainBatches, {
        epochs: 2
    });
    // read more about input and output streams:
    // @see https://github.com/nodejs/node/blob/master/doc/api/stream.md
};
exports.Run = Run;
