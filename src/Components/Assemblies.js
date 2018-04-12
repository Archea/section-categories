import React, { Component } from 'react'
import AssemblyList from './AssemblyList'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export class Assemblies extends Component {
  render() {
    if (this.props.getAll && this.props.getAll.loading) {
      return <div>Loading</div>
    }

    if (this.props.getAll && this.props.getAll.error) {
      console.log('Get All Assemblies error: ' + this.props.getAll.error)
      return <div>Error</div>
    }
    const rawAssemblies = this.props.getAll.allUniformatClassifications
    if (!rawAssemblies) {
      return <div>Error no assemblies !!</div>
    }
    const assemblies = InitialSplit(rawAssemblies)
    return (
      <div className="Assemblies">
        <AssemblyList assemblies={assemblies} />
      </div>
    )
  }
}

/*
Split Assemblies by level (1-5)
Split all levels by code -level
*/
const SplitAssmblies = assemblies => {}
/*
Get all level 1 assemblies as starting point.
*/
const InitialSplit = assemblies => {
  return assemblies.filter(assembly => assembly.level == 1)
}
/*
  Given the selected asseimblies code and level
  Select the relevent sub assemblies
*/
const SelectableAssemblies = selected => {}

/*
    Set the bread crumb to show selected assembly and its parents
*/
const SelectAssembly = selected => {}

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
