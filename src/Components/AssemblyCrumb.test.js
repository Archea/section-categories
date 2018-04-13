import React from 'react'
import ReactDOM from 'react-dom'
import Assembly from './AssemblyCrumb'
import renderer from 'react-test-renderer'

describe('AssemblyCrumb', () => {
  const mocks = {
    selected: {
      id: '7777f4e9-bc0d-45cf-b66d-b97ad4638dc0',
      description: 'FOUNDATIONS',
      code: 'A10',
      level: 2
    }
  }

  test('it at renders and matches snapshot', () => {
    const comp = renderer.create(<Assembly {...mocks} />)
    expect(comp).toBeDefined()
    expect(comp.toJSON()).toMatchSnapshot()
  })
})
