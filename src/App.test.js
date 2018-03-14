import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router'
import { shallow, configure, mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import CategoryList from './Components/CategoryList'
import NotFound from './Components/NotFound'
configure({ adapter: new Adapter() })

it('renders without crashing', () => {})

test('invalid path should redirect to 404', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/random']}>
      <App />
    </MemoryRouter>
  )
  expect(wrapper.find(CategoryList)).toHaveLength(0)
  expect(wrapper.find(NotFound)).toHaveLength(0)
})
