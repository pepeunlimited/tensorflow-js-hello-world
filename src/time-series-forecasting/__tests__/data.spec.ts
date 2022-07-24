// @see https://blog.logrocket.com/testing-typescript-apps-using-jest/

import * as fs from 'node:fs/promises'
import { csv, csv_path, readLocal, rmLocal } from '../data'

// MARK: Utility functions for testing

// MARK: Test cases for Data.ts

describe('Data.ts', () => {
  beforeAll(() => {
    // setup ..
  })
  afterAll(() => {
    // teardown ..
  })
  describe('readLocal', () => {
    beforeAll(async () => {
      await rmLocal()
    })
    it('should be loaded', async () => {
      // create tmp file for readLocal
      await fs.writeFile(`${csv_path}/${csv}`, 'Hello, World!')
      const result = await readLocal()
      expect(result.ok).toBe(true)
//      const isOk = result.ok
//      const isErr = result.err
    })
  })
  describe('fetchExternal', () => {})
})
