import React, { Component } from 'react'
import AssemblyList from './AssemblyList'
import AssemblyCrumb from './AssemblyCrumb'
import ProductFamilyListA from './ProductFamilyListA'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
/*
  an emptly assembly object this is the only state of
  the assembly component tree
*/
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
  //using local state for brevity.
  setSelected = selection => {
    this.setState(state => {
      return { ...state, selected: selection }
    })
  }
  /*
    this decomposes the current crumb by level
    the level of the button clicked is sliced down to get
    higher up the current assembly three
    the code that matches is the new selection we want.
  */
  selectCrumb = level => {
    if (level === 0) this.setSelected(initialState)
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
    //This should always return, the content service is down if it fails
    const assemblies = this.props.getAll.allUniformatClassifications
    if (!assemblies) {
      return <div>Error no assemblies !!</div>
    }
    //Don't make a list with an empty id, aka no selection, avoid call and render
    const productFamilies =
      this.state.selected.id === '' ? (
        <div>none selected</div>
      ) : (
        <ProductFamilyListA assemblieId={this.state.selected.id} />
      )
    //clearing the selection effectively gets you back to the top of the tree
    return (
      <div className="Assemblies">
        <button onClick={e => this.setSelected(initialState.selected)}>
          Top
        </button>
        <AssemblyCrumb
          selected={this.state.selected}
          onCrumb={this.selectCrumb}
        />
        <AssemblyList
          assemblies={assemblies}
          selected={this.state.selected}
          select={this.setSelected}
        />
        {productFamilies}
      </div>
    )
  }
}
/*
  Assembly codes follow a strict schema like mf section#s
  we can use that to decompse them by charactar position.
  This returns the correct character position for a given level
  in a code.
*/
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
