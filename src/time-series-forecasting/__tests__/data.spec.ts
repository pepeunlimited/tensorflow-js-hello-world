
// @see https://blog.logrocket.com/testing-typescript-apps-using-jest/

import { readLocal, rmLocal } from "../data"
import * as fs from 'node:fs/promises'

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
      // await readLocal()
    })
  })
  describe('fetchExternal', () => {
    
  })
})