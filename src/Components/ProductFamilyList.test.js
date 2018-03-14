import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, configure } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import { ProductFamilyList } from './ProductFamilyList'

configure({ adapter: new Adapter() })

describe('ProductFamilyList', () => {
  const mocks = [
    {
      id: '1',
      name: 'bar',
      delimiter: '::',
      familyId: '1'
    },
    {
      id: '2',
      name: 'foosle',
      delimiter: ':',
      familyId: '2'
    }
  ]
  const mockGetAll = jest.fn
  const mockprops = {
    getAll: {
      productFamilyCategory: {
        associatedFamilies: mocks
      }
    }
  }
  test('it at least shallow renders and match snapshot', () => {
    const wrapper = shallow(<ProductFamilyList {...mockprops} />)
    wrapper.setProps(mockprops)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
