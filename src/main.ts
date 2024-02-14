//
//  Copyright 2022 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//

// import { Run as DataNode_Run } from './data-node/train.js'
// import { Run as Graph_Run } from './tf_graph'
// import { Run as HelloWorld_Run } from './tf_hello_world'
// import { Run as DataNodePrius_Run } from './data-node-prius/train.js'
import { Run as KlinesBinance_Run } from './klines-binance/train.js'

// execute the main function which is defined
// at package.json as { ... "main": "dist/main.js" ... }
//  execute the program:
//   1. `$ npm run build`
//   2. `$ npm run start`
const main = async (): Promise<void> => {
  // HelloWorld_Run()
  // Graph_Run()
  // DataNode_Run()
  // DataNodePrius_Run()
  KlinesBinance_Run()
}

main()
