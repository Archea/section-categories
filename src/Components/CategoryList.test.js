import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, configure } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { CategoryList } from './CategoryList'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('CategoryList', () => {
  const mocks = [
    {
      id: '1',
      name: 'bar'
    },
    {
      id: '2',
      name: 'foosle'
    }
  ]
  const mockGetAll = jest.fn
  const mockprops = {
    getAll: {
      allProductFamilyCategories: mocks
    }
  }
  test('it at least shallow renders and match snapshot', () => {
    const wrapper = shallow(<CategoryList {...mockprops} />)
    wrapper.setProps(mockprops)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
