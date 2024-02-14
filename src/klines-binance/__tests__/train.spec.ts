//
//  Copyright 2023 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//
//  @see https://blog.logrocket.com/testing-typescript-apps-using-jest/
//  @see https://jestjs.io/docs/api

import * as tf from '@tensorflow/tfjs-node'
import * as fs from 'node:fs/promises'
import { Dataset, json, json_path, rmLocal } from '../data'
import { CreateModel } from '../model'

// MARK: Test cases for model.ts

xdescribe('KlinesBinance/Train.ts', () => {
  xdescribe('Train with temp data', () => {
    beforeEach(async () => {
      // create tmp file for readLocal
      await fs.writeFile(`${json_path}/${json}`, '[[1701388800000,"37723.97000000","37744.72000000","37699.57000000","37699.57000000","80.47447000",1701388979999,"3035672.15282720",2742,"20.32624000","766891.17063730","0"],[1701388980000,"37699.58000000","37699.58000000","37688.27000000","37697.34000000","31.08715000",1701389159999,"1171818.70969860",1251,"12.63683000","476310.27311330","0"],[1701389160000,"37697.34000000","37697.35000000","37688.37000000","37690.62000000","19.41013000",1701389339999,"731646.81986770",1160,"6.31120000","237905.39679160","0"],[1701389340000,"37690.63000000","37690.63000000","37628.28000000","37655.50000000","107.31976000",1701389519999,"4041575.84027440",2786,"33.67093000","1267817.49253960","0"],[1701389520000,"37655.49000000","37655.53000000","37633.32000000","37633.33000000","59.91402000",1701389699999,"2255616.73768270",2088,"21.57681000","812284.18989670","0"],[1701389700000,"37633.32000000","37640.53000000","37615.86000000","37640.52000000","71.77984000",1701389879999,"2700880.72571590",2389,"30.75198000","1157116.43527940","0"],[1701389880000,"37640.53000000","37640.53000000","37626.97000000","37638.67000000","24.98764000",1701390059999,"940447.70446620",1337,"11.80861000","444428.75063850","0"],[1701390060000,"37638.66000000","37638.73000000","37634.63000000","37638.72000000","19.16398000",1701390239999,"721286.46514000",1004,"10.54148000","396752.53139350","0"],[1701390240000,"37638.73000000","37643.55000000","37618.00000000","37622.64000000","41.72844000",1701390419999,"1570400.55836400",1501,"14.81553000","557533.40705500","0"],[1701390420000,"37622.64000000","37631.13000000","37618.00000000","37627.91000000","23.82343000",1701390599999,"896347.60062070",1398,"14.05511000","528807.96185590","0"],[1701390600000,"37627.90000000","37663.18000000","37616.12000000","37654.80000000","45.60536000",1701390779999,"1716401.80059190",2363,"28.86772000","1086516.47358350","0"],[1701390780000,"37654.80000000","37665.35000000","37633.75000000","37650.51000000","36.09612000",1701390959999,"1359139.76590710",2121,"19.47621000","733300.47777470","0"]]')
    })
    afterEach(async () => {
      await rmLocal()
    })
    it('should be ok', async () => {
      const data = await Dataset()
      const model = CreateModel([data.unwrap().numberOfColumns])
      const dataset = data.unwrap().dataset.shuffle(12).batch(4)
      const trainDataset = dataset.take(2)
      const validationDataset = dataset.skip(2)
      // fit the dataset for tf
      await model.fitDataset(trainDataset, {
        epochs: 100,
        validationData: validationDataset,
      })
    })
  })
  describe('Train with real data', () => {
    // curl "https://api.binance.com/api/v3/klines?startTime=1701388800000&interval=3m&symbol=BTCUSDT&limit=1000" -o ~/github/tensorflow-js-hello-world/binance-klines-1000-2023-12-01-0000.json
    const json = 'binance-klines-1000-2023-12-01-0000.json'
    beforeEach(async () => {
    })
    afterEach(async () => {
    })
    it('should be ok', async () => {
      const data = await Dataset({
        json: json,
      })
      const model = CreateModel([data.unwrap().numberOfColumns])
      const dataset = data.unwrap().dataset.shuffle(512).batch(256)
      const trainDataset = dataset.take(128)
      const validationDataset = dataset.skip(2)
      // fit the dataset for tf
      await model.fitDataset(trainDataset, {
        epochs: 100,
        validationData: validationDataset,
      })
      // stream - IOs - save & load models - native file system (node.js)
      //
      // notice: model.save pathOrIOHandler includes file:// protocol
      // without protocol tf throws: 'ValueError: Cannot find any save handlers for URL' expection
      // const pathOrIOHandler: string = 'file://src/klines-binance/model-v1'
      // stream output
      // await model.save(pathOrIOHandler)
      // stream input
      //const input = await tf.loadLayersModel(`${pathOrIOHandler}/model.json`)
      model.summary()
      //input.summary()
    }, 120 * 1000)
  })
})

