// @see https://blog.logrocket.com/testing-typescript-apps-using-jest/
// @see https://jestjs.io/docs/api


import * as fs from 'node:fs/promises'
import { csv, csv_path, readLocal, rmLocal, DataError, accessLocal } from '../data'

// MARK: Utility functions for testing

// MARK: Test cases for Data.ts

describe('Data.ts', () => {
  beforeAll(() => {
    
  })
  afterAll(() => {
    // teardown ..
  })
  describe('readLocal', () => {
    beforeEach(async () => {
      await rmLocal()  
    })
    it('should be loaded', async () => {
      // create tmp file for readLocal
      await fs.writeFile(`${csv_path}/${csv}`, 'Hello, World!')
      const result = await readLocal()
      expect(result.ok).toBe(true)
    })
    it('should not be loaded', async () => {
      // create tmp file for readLocal
      const result = await readLocal()
      expect(result.err).toBe(true)
      expect(result.val).toBe('LOCAL_CSV_NOT_EXIST')
    })
  })
  describe('rmLocal', () => {
    it('should be deleted', async () => {
      // create tmp file for readLocal
      await fs.writeFile(`${csv_path}/${csv}`, 'Hello, World!')
      const r1 = await rmLocal()
      expect(r1.ok).toBe(true)
      const r2 = await accessLocal()
      expect(r2.err).toBe(true)
      expect(r2.val).toBe('LOCAL_CSV_NOT_EXIST')
    })
    it('should not be deleted', async () => {
      // create tmp file for readLocal
      //const result = await readLocal()
      //expect(result.err).toBe(true)
      //console.log(result)
    })
  })
  describe('fetchExternal', () => {})
})
