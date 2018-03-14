import React from 'react'
import ReactDOM from 'react-dom'
import { Category } from './Category'
import renderer from 'react-test-renderer'
import { StaticRouter } from 'react-router'

describe('Category', () => {
  const mocks = {
    Category: {
      id: '1',
      name: 'bar'
    }
  }

  test('it at renders and matches snapshot', () => {
    const context = {}
    const comp = renderer.create(
      <StaticRouter location="/" context={context}>
        <Category {...mocks} />
      </StaticRouter>
    )
    expect(comp).toBeDefined()
    expect(comp.toJSON()).toMatchSnapshot()
  })
})
