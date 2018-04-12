import React from 'react'
import ReactDOM from 'react-dom'
import Assembly from './Assembly'
import renderer from 'react-test-renderer'

describe('Assembly', () => {
  const mocks = {
    Assembly: {
      level: 1,
      code: 'a18',
      description: 'an assembly I guess',
      id: 1,
    },
  }

  test('it at renders and matches snapshot', () => {
    const comp = renderer.create(<Assembly {...mocks} />)
    expect(comp).toBeDefined()
    expect(comp.toJSON()).toMatchSnapshot()
  })
})
