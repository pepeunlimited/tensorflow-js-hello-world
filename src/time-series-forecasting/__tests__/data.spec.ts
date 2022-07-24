// @see https://blog.logrocket.com/testing-typescript-apps-using-jest/

import { readLocal, rmLocal } from '../data'

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
      const csv = await readLocal()
      console.log(csv)
    })
  })
  describe('fetchExternal', () => {})
})
