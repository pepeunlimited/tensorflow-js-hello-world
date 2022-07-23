tensorflow-js-hello-world
-------------------------

Simple hello-world example for tensorflow-js

Prerequisites
-------------

1. Clone project  
`$ git clone git@github.com:pepeunlimited/tensorflow-js-hello-world.git`  
2. Install node  
`$ brew install node`  
3. Install install node dependencies  
`$ npm install` 

Usage
-----

1. Build project  
`$ npm run build`  
2. Run project  
`$ npm run start` 
3. Run test  
`$ npm run test` 

Node.js & Typescript Setup
--------------------------

`$ npm install @tensorflow/tfjs-node`  
`$ npm install -g typescript`

Dependencies
------------

- [`TensorFlow.js`](https://www.tensorflow.org/js)  
- [`ts-results`](https://github.com/vultix/ts-results)  
  - `rust` and `swift` like result check for `.success` and `.failure` cases.

devDependencies
---------------

- [`Jest`](https://github.com/facebook/jest)  
  - Unit-test framework
- [`swc.rs`](https://swc.rs/)  
  - I wanted to use ESM, `speedy web compiler` is workaround until `jest` gives some kind support for ESM.  
    - [`jest.mock does not mock an ES module without Babel #10025`](https://github.com/facebook/jest/issues/10025)  
    - [`[Feature]: esm/cjs autodetection for TypeScript files #12800`](https://github.com/facebook/jest/issues/12800)  
    - [`Meta: Native support for ES Modules #9430`](https://github.com/facebook/jest/issues/9430)  

Links
-----


[`tfjs-examples`](https://github.com/tensorflow/tfjs-examples)  
[`pretrained-models-for-tensorflow.js`](https://github.com/tensorflow/tfjs-models)  
[`flow-error-icu4c-not-loaded.md`](https://gist.github.com/berkedel/d1fc6d13651c16002f64653096d1fded)  
[`Airbnb JavaScript Style Guide() {`](https://github.com/airbnb/javascript)  

License
-------

**tensorflow-js-hello-world** is released under the MIT license. See `LICENSE` for details.
