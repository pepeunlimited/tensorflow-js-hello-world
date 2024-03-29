//
//  Copyright 2022 Pepe Unlimited
//  Licensed under the MIT license, see associated LICENSE file for terms.
//  See AUTHORS file for the list of project authors.
//

type Sex = 'M' | 'F'

type Human = {
  // sex of the given object (tf.label)
  sex: Sex
  // age of the given object (tf.feature)
  age: number
  // weight of the given object (tf.feature)
  weight: number
  // height of the given object (tf.feature)
  height: number
}

const source: Human[] = [
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
  {
    sex: 'M',
    age: 33,
    weight: 70,
    height: 180,
  },
]

export { source, Human, Sex }
