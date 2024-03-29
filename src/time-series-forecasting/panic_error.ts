//
//  Copyright 2022 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//

class PanicError extends Error {
  constructor(val: any) {
    super(`panic: ${val}`)
  }
}

export { PanicError }
