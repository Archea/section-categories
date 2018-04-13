import React, { Component } from 'react'
import AssemblyList from './AssemblyList'
import AssemblyCrumb from './AssemblyCrumb'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const initialState = {
  selected: {
    id: '',
    description: '',
    code: '',
    level: 0
  }
}

export class Assemblies extends Component {
  state = initialState

  setSelected = selection => {
    //this.state = {..., assemblies : SelectAssembly(selection) }

    this.setState(state => {
      return { ...state, selected: selection }
    })
  }

  selectCrumb = level => {
    const code = this.state.selected.code.slice(0, CodeSlice(level))
    const setTo = this.props.getAll.allUniformatClassifications.find(
      a => a.code === code
    )
    this.setSelected(setTo)
  }

  render() {
    if (this.props.getAll && this.props.getAll.loading) {
      return <div>Loading</div>
    }

    if (this.props.getAll && this.props.getAll.error) {
      console.log('Get All Assemblies error: ' + this.props.getAll.error)
      return <div>Error</div>
    }
    const assemblies = this.props.getAll.allUniformatClassifications
    if (!assemblies) {
      return <div>Error no assemblies !!</div>
    }
    return (
      <div className="Assemblies">
        <AssemblyCrumb
          selected={this.state.selected}
          onCrumb={this.selectCrumb}
        />
        <AssemblyList
          assemblies={assemblies}
          selected={this.state.selected}
          select={this.setSelected}
        />
      </div>
    )
  }
}

const CodeSlice = level => {
  switch (level) {
    case 1:
      return 1
    case 2:
      return 3
    case 3:
      return 5
    case 4:
      return 8
    case 5:
      return 10
    default:
      return 0
  }
}

/*
    Set the bread crumb to show selected assembly and its parents
*/
const SelectAssembly = selected => {}
//this is the graphql query to get all the assemblies
const ASSEMBLIES_QUERY = gql`
  query GetAll {
    allUniformatClassifications {
      id
      description
      code
      level
    }
  }
`
export default graphql(ASSEMBLIES_QUERY, { name: 'getAll' })(Assemblies)
