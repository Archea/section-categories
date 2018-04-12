import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, configure } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { Assemblies } from './Assemblies'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Assemblies', () => {
  const mockAssemblies = [
    {
      id: '1',
      name: 'bar',
      prefix: 'fixed',
      description: 'a solid steele cylnder',
      category: 'structural restraints',
      productFamilies: ['tough things', 'cage stuff']
    },
    {
      id: '2',
      name: 'foosle',
      prefix: 'fix',
      description: 'a stone cylnder',
      category: 'structural supports',
      productFamilies: ['tough things', 'hard stuff']
    }
  ]
  const mockGetAll = jest.fn
  const mockprops = {
    getAll: {
      allUniformatClassifications: mockAssemblies
    }
  }
  test('it at least shallow renders and match snapshot', () => {
    const wrapper = shallow(<Assemblies {...mockprops} />)
    wrapper.setProps(mockprops)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
