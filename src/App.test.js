/*
If you are getting an eroror like this:
 FAIL  src\App.test.js
  ● Test suite failed to run

    C:\dev\assemblies\node_modules\graphql\language\parser.mjs:10
    import { Source } from './source';
    ^^^^^^
  its a problem with the tester trying to run the .mjs files that come in the graphql module, 
  easiest fix to just delete them after you've yarn install 'ed
*/


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
