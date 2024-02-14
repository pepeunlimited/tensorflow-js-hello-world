//
//  Copyright 2023 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//
//  @see https://blog.logrocket.com/testing-typescript-apps-using-jest/
//  @see https://jestjs.io/docs/api

import * as fs from 'node:fs/promises'
import { Dataset, json, json_path, readLocal, rmLocal } from '../data'

// MARK: Utility functions for testing

// MARK: Test cases for Data.ts

xdescribe('KlinesBinance/Data.ts', () => {
  beforeEach(async () => {
      // create tmp file for readLocal
      await fs.writeFile(`${json_path}/${json}`, '[[1701388800000,"37723.97000000","37744.72000000","37699.57000000","37699.57000000","80.47447000",1701388979999,"3035672.15282720",2742,"20.32624000","766891.17063730","0"]]')
  })
  afterEach(async () => {
      await rmLocal()
  })
  describe('readLocal', () => {
    it('should be loaded', async () => {
      const r1 = await readLocal()
      expect(r1.isOk()).toBe(true)
      expect(r1.unwrap()).toEqual([{
        open_time: 1701388800000,
        open_price: "37723.97000000",
        high_price: "37744.72000000",
        low_price: "37699.57000000",
        close_price: "37699.57000000",
        volume: "80.47447000",
        close_time: 1701388979999,
        quote_asset_volume: "3035672.15282720",
        number_of_trades: 2742,
        taker_buy_base_asset_volume: "20.32624000",
        taker_buy_quote_asset_volume: "766891.17063730",
      }])
    })
    it('should not be loaded', async () => {
      await rmLocal()
      // create tmp file for readLocal
      const r1 = await readLocal()
      expect(r1.isErr()).toBe(true)
      expect(r1.unwrapErr()).toBe('JSON_ENOENT')
    })
    it('should be unexpected error', async () => {
      // TODO: write mock
    })
  })
  describe('Dataset', () => {
    it('should be loaded', async () => {
      const r1 = await Dataset()
      expect(r1.isOk()).toBe(true)
    })
    it('should not be loaded', async () => {
      await rmLocal()
      // create tmp file for readLocal
      const r1 = await readLocal()
      expect(r1.isErr()).toBe(true)
      expect(r1.unwrapErr()).toBe('JSON_ENOENT')
    })
  })
})
