import { Run as DataNode_Run } from './data-node/train'
// import { Run as Graph_Run } from './tf_graph'
// import { Run as HelloWorld_Run } from './tf_hello_world'

// execute the main function which is defined
// at package.json as { ... "main": "dist/main.js" ... }
//  execute the program:
//   1. `$ npm run build`
//   2. `$ npm run start`
const main = async (): Promise<void> => {
  //  HelloWorld_Run()
  //  Graph_Run()
  DataNode_Run()
}

main()
