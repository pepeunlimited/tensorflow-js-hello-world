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
    //
    // const xs = Object.fromEntries(['age', 'weight', 'height'].map(k => [k, human[k as keyof typeof human]]))
    const data = [
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
        {
            sex: 'M',
            age: 33,
            weight: 70,
            height: 180,
        },
    ];
    const dataset = tf.data.array(data);
    return {
        dataset: dataset.map((row) => {
            const human = row;
            // NOTICE:
            // with tf.data.csv you should use for FEATURE(xs) and LABEL(ys)
            // const xs = row['xs']
            // const ys = row['ys']
            // filter age out of the human row
            const xs = Object.keys(human)
                .filter((k) => !k.includes('age'))
                .map((k) => {
                const value = human[k];
                // typecast sex M(0) F(1)
                switch (k) {
                    case 'sex':
                        switch (value) {
                            case 'M':
                                return 0;
                            case 'F':
                                return 1;
                            default:
                                return -1;
                        }
                    default:
                        return value;
                }
            });
            // filter age in of the human row
            const ys = Object.keys(human)
                .filter((k) => k.includes('age'))
                .map((k) => human[k]);
            console.log(`dataset.row: ${JSON.stringify(row)}, xs: ${xs}, ys: ${ys}`);
            return { xs: xs, ys: ys };
        }),
        numberOfColumns: 3, // @see Data.numberOfColumns
    };
};
exports.DatasetV1 = DatasetV1;
