//
//  Copyright 2022 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//
//  @see https://blog.logrocket.com/testing-typescript-apps-using-jest/
//  @see https://jestjs.io/docs/api

import * as fs from 'node:fs/promises'
import { csv, csv_path, readLocal, rmLocal, accessLocal, fetchExternal, saveExternal, Dataset, CreateWindow } from '../data'

// MARK: Utility functions for testing

// MARK: Test cases for Data.ts

describe('TimeSeriesForecasting/Data.ts', () => {
  beforeEach(async () => {
    // create tmp file for readLocal
    await fs.writeFile(`${csv_path}/${csv}`, `"Date Time","p (mbar)","T (degC)","Tpot (K)","Tdew (degC)","rh (%)","VPmax (mbar)","VPact (mbar)","VPdef (mbar)","sh (g/kg)","H2OC (mmol/mol)","rho (g/m**3)","wv (m/s)","max. wv (m/s)","wd (deg)"
01.01.2009 00:10:00,996.52,-8.02,265.40,-8.90,93.30,3.33,3.11,0.22,1.94,3.12,1307.75,1.03,1.75,152.30
01.01.2009 00:20:00,996.57,-8.41,265.01,-9.28,93.40,3.23,3.02,0.21,1.89,3.03,1309.80,0.72,1.50,136.10
01.01.2009 00:30:00,996.53,-8.51,264.91,-9.31,93.90,3.21,3.01,0.20,1.88,3.02,1310.24,0.19,0.63,171.60
01.01.2009 00:40:00,996.51,-8.31,265.12,-9.07,94.20,3.26,3.07,0.19,1.92,3.08,1309.19,0.34,0.50,198.00
01.01.2009 00:50:00,996.51,-8.27,265.15,-9.04,94.10,3.27,3.08,0.19,1.92,3.09,1309.00,0.32,0.63,214.30
01.01.2009 01:00:00,996.50,-8.05,265.38,-8.78,94.40,3.33,3.14,0.19,1.96,3.15,1307.86,0.21,0.63,192.70
01.01.2009 01:10:00,996.50,-7.62,265.81,-8.30,94.80,3.44,3.26,0.18,2.04,3.27,1305.68,0.18,0.63,166.50
01.01.2009 01:20:00,996.50,-7.62,265.81,-8.36,94.40,3.44,3.25,0.19,2.03,3.26,1305.69,0.19,0.50,118.60
01.01.2009 01:30:00,996.50,-7.91,265.52,-8.73,93.80,3.36,3.15,0.21,1.97,3.16,1307.17,0.28,0.75,188.50
01.01.2009 01:40:00,996.53,-8.43,264.99,-9.34,93.10,3.23,3.00,0.22,1.88,3.02,1309.85,0.59,0.88,185.00
01.01.2009 01:50:00,996.62,-8.76,264.66,-9.66,93.10,3.14,2.93,0.22,1.83,2.94,1311.64,0.45,0.88,183.20
01.01.2009 02:00:00,996.62,-8.88,264.54,-9.77,93.20,3.12,2.90,0.21,1.81,2.91,1312.25,0.25,0.63,190.30`)
  })
  afterEach(async () => {
    await rmLocal()
  })
  describe('readLocal', () => {
    it('should be loaded', async () => {
      const r1 = await readLocal()
      expect(r1.isOk()).toBe(true)
    })
    it('should not be loaded', async () => {
      await rmLocal()
      const r1 = await readLocal()
      expect(r1.isErr()).toBe(true)
      expect(r1.unwrapErr()).toBe('CSV_ENOENT')
    })
    it('should be unexpected error', async () => {
      // TODO: write mock
    })
  })
  describe('rmLocal', () => {
    it('should be deleted', async () => {
      const r1 = await rmLocal()
      expect(r1.isOk()).toBe(true)
      const r2 = await accessLocal()
      expect(r2.isErr()).toBe(true)
      expect(r2.unwrapErr()).toBe('CSV_ENOENT')
    })
    it('should not be deleted', async () => {
      await rmLocal()
      const r1 = await rmLocal()
      expect(r1.isErr()).toBe(true)
      expect(r1.unwrapErr()).toBe('CSV_ENOENT')
    })
    it('should be unexpected error', async () => {
      // TODO: write mock
    })
  })
  xdescribe('fetchExternal', () => {
    it('should be downloaded', async () => {
      await rmLocal()
      let bytes = await fetchExternal()
      await saveExternal(bytes.unwrap().body!)
    }, 60 * 1000)
  })
  xdescribe('Dataset', () => {
    xit('should be downloaded', async () => {
      await rmLocal()
      const r1 = await Dataset()
      const a1 = await r1.unwrap().dataset.toArray()
      expect(a1.length).toEqual(420551)
    }, 256 * 1000)
    xit('should not be downloaded', async () => {
      const r1 = await Dataset()
      const a1 = await r1.unwrap().dataset.toArray()
      expect(a1.length).toEqual(12)
    })
  })
  describe('CreateWindow', () => {
    it('ingle prediction 24 hours into the future, given 24 hours of history', async () => {
      const cw1 = CreateWindow({
        numberOfTimeSteps: 24,
        offset: 1,
      }).next()


      
      
    })
  })
})
