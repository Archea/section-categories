import React from 'react'
import ReactDOM from 'react-dom'
import { NotFound } from './NotFound'
import renderer from 'react-test-renderer'

describe('NotFound', () => {
  test('it at renders and matches snapshot', () => {
    const comp = renderer.create(<NotFound />)
    expect(comp).toBeDefined()
    expect(comp.toJSON()).toMatchSnapshot()
  })
})
