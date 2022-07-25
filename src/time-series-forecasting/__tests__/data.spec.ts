// @see https://blog.logrocket.com/testing-typescript-apps-using-jest/
// @see https://jestjs.io/docs/api

import * as fs from 'node:fs/promises'
import { csv, csv_path, readLocal, rmLocal, accessLocal, fetchExternal } from '../data'

// MARK: Utility functions for testing

// MARK: Test cases for Data.ts

describe('Data.ts', () => {
  beforeAll(() => {})
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
      const r1 = await readLocal()
      expect(r1.ok).toBe(true)
    })
    it('should not be loaded', async () => {
      // create tmp file for readLocal
      const r1 = await readLocal()
      expect(r1.err).toBe(true)
      expect(r1.val).toBe('CSV_ENOENT')
    })
    it('should be unexpected error', async () => {
      // TODO: write mock
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
      expect(r2.val).toBe('CSV_ENOENT')
    })
    it('should not be deleted', async () => {
      const r1 = await rmLocal()
      expect(r1.err).toBe(true)
      expect(r1.val).toBe('CSV_ENOENT')
    })
    it('should be unexpected error', async () => {
      // TODO: write mock
    })
  })
  describe('fetchExternal', () => {
    beforeEach(async () => {
      await rmLocal()
    })
    it('should be downloaded', async () => {
      await fetchExternal()      
    })
  })
})
