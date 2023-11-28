//
//  Copyright 2022 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//
//  @see https://blog.logrocket.com/testing-typescript-apps-using-jest/
//  @see https://jestjs.io/docs/api

import * as fs from 'node:fs/promises'
import { csv, csv_path, readLocal, rmLocal, accessLocal, fetchExternal, saveExternal } from '../data'

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
      expect(r1.isOk()).toBe(true)
    })
    it('should not be loaded', async () => {
      // create tmp file for readLocal
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
      // create tmp file for readLocal
      await fs.writeFile(`${csv_path}/${csv}`, 'Hello, World!')
      const r1 = await rmLocal()
      expect(r1.isOk()).toBe(true)
      const r2 = await accessLocal()
      expect(r2.isErr()).toBe(true)
      expect(r2.unwrapErr()).toBe('CSV_ENOENT')
    })
    it('should not be deleted', async () => {
      const r1 = await rmLocal()
      expect(r1.isErr()).toBe(true)
      expect(r1.unwrapErr()).toBe('CSV_ENOENT')
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
      // TODO: read response stream
      let bytes = (await fetchExternal()).unwrap().body
      await saveExternal(bytes!)
    }, 60*1000)
  })
})
