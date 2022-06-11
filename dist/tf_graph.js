"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Run = void 0;
const tf = require("@tensorflow/tfjs-node");
const Run = async () => {
    const xs = tf.tensor1d([5], 'int32');
    const ys = tf.tensor1d([2], 'int32');
    const zs = tf.tensor1d([3], 'int32');
    const as = tf.mul(xs, ys); // *
    const bs = tf.add(zs, ys); // +
    const cs = tf.sub(as, bs); // -
    as.print();
    bs.print();
    cs.print();
};
exports.Run = Run;
