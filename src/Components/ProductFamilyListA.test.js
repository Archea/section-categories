import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, configure } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import { ProductFamilyListA } from './ProductFamilyListA'

configure({ adapter: new Adapter() })

describe('ProductFamilyListA', () => {
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
      uniformatClassification: {
        associatedFamilies: mocks
      }
    }
  }
  test('it at least shallow renders and match snapshot', () => {
    const wrapper = shallow(<ProductFamilyListA {...mockprops} />)
    wrapper.setProps(mockprops)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
