import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, configure } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { SectionSearch } from './SectionSearch'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('SectionSearch', () => {
  const mockAssemblies = [
    {
      id: '63ef3b02-faa5-44f5-a677-99775fdaeffb',
      description: 'SUBSTRUCTURE',
      code: 'A',
      level: 1
    },
    {
      id: '7777f4e9-bc0d-45cf-b66d-b97ad4638dc0',
      description: 'FOUNDATIONS',
      code: 'A10',
      level: 2
    }
  ]
  const mockSelected = {
    id: '',
    description: '',
    code: '',
    level: 0
  }
  const mockGetAll = jest.fn
  const mockprops = {
    getAll: {
      allUniformatClassifications: mockAssemblies
    },
    assemblies: mockAssemblies,
    selected: mockSelected
  }
  test('it at least shallow renders and match snapshot', () => {
    const wrapper = shallow(<SectionSearch {...mockprops} />)
    wrapper.setProps(mockprops)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
