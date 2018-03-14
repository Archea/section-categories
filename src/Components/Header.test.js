import React from 'react'
import ReactDOM from 'react-dom'
import { Category } from './Category'
import renderer from 'react-test-renderer'
import Header from './Header'
import { shallow, configure, mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import { StaticRouter } from 'react-router'

configure({ adapter: new Adapter() })

describe('Header router', () => {
  test('should render', () => {
    const context = {}
    const wrapper = shallow(
      <StaticRouter location="/" context={context}>
        <Header />
      </StaticRouter>,
    )
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
