//
//  Copyright 2023 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//
//  @see https://blog.logrocket.com/testing-typescript-apps-using-jest/
//  @see https://jestjs.io/docs/api

import { CreateModel } from '../model'

// MARK: Test cases for model.ts

xdescribe('KlinesBinance/Model.ts', () => {
  beforeAll(() => {})
  afterAll(() => {
    // teardown ..
  })
  describe('CreateModel', () => {
    beforeEach(async () => {
    })
    it('should be ok', async () => {
      const numberOfColumns: number = 2
      expect(CreateModel([numberOfColumns])).toBeDefined()
    })
  })
})
