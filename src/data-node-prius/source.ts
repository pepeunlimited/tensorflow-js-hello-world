//
//  Copyright 2023 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//

type Car = {
  // milage of the given object (tf.feature)
  milage: number
  // (e.g. 2023) age of the given object (tf.feature)
  age: number
  // (e.g. $20000) price of the given object(tf.feature)
  price: number
}

const source: Car[] = [
  {
    milage: 0,
    age: 2024,
    price: 60000
  },
  {
    milage: 1205,
    age: 2022,
    price: 20000
  },
  {
    milage: 0,
    age: 2000,
    price: 3000
  },
  {
    milage: 1205,
    age: 2021,
    price: 10000
  },
  {
    milage: 20000,
    age: 1999,
    price: 3000
  },
  {
    milage: 1205,
    age: 2022,
    price: 20000
  },
  {
    milage: 0,
    age: 2024,
    price: 60000
  },
  {
    milage: 1205,
    age: 2022,
    price: 20000
  },
  {
    milage: 0,
    age: 2024,
    price: 60000
  },
  {
    milage: 1205,
    age: 2022,
    price: 20000
  },
  {
    milage: 0,
    age: 2024,
    price: 60000
  },
  {
    milage: 1205,
    age: 2022,
    price: 20000
  }
]

export { source, Car }
