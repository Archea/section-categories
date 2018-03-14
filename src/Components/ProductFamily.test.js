import React from 'react'
import ReactDOM from 'react-dom'
import ProductFamily from './ProductFamily'
import renderer from 'react-test-renderer'

describe('ProductFamily', () => {
  const mocks = {
    productFamily: {
      id: '1',
      name: 'bar',
      delimiter: '-I-',
      familyId: '3',
    },
  }

  test('it at renders and matches snapshot', () => {
    const comp = renderer.create(<ProductFamily {...mocks} />)
    expect(comp).toBeDefined()
    expect(comp.toJSON()).toMatchSnapshot()
  })
})
