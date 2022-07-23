
// @see https://blog.logrocket.com/testing-typescript-apps-using-jest/

import { fetchLocal } from "../data"

describe('Data.ts', () => {
  beforeAll(() => {
    // setup ..
  })
  afterAll(() => {
    // teardown ..
  })
  describe('fetchLocal', () => {
    it('should be loaded', async () => {
      await fetchLocal()
    })
  })
  describe('fetchExternal', () => {
    
  })
})