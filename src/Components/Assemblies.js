import React, { Component } from 'react'
import AssemblyList from './AssemblyList'
import AssemblyCrumb from './AssemblyCrumb'
import ProductFamilyListA from './ProductFamilyListA'
import { CodeChildSearch } from './Search/AsChild/CodeChildSearch'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import AssembliesJSON from '../some.json'
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
  },
  showList: false,
  selections: []
}

export class Assemblies extends Component {
  state = initialState
  //using local state for brevity.
  setSelected = selection => {
    this.setState(state => {
      return { ...state, selected: selection }
    })
  }
  //Set the selection with by code string
  selectByCode = code => {
    const setTo = AssembliesJSON.data.allUniformatClassifications.find(
      a => a.code === code
    )
    this.setSelected(setTo)
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
    const setTo = AssembliesJSON.data.allUniformatClassifications.find(
      a => a.code === code
    )
    this.setSelected(setTo)
  }

  toggleShowList = event => {
    this.setState(state => {
      return { ...state, showList: !state.showList }
    })
  }

  addSelected = () => {
    this.setState(state => {
      return {
        ...state,
        selections: [...this.state.selections, this.state.selected]
      }
    })
  }

  render() {
    const assemblies = AssembliesJSON.data.allUniformatClassifications
    if (!assemblies) {
      return <div>Error no assemblies !!</div>
    }
    //Don't make a list with an empty id, aka no selection, avoid call and render
    const productFamilies =
      this.state.selections.length === 0 ? (
        <div>none selected</div>
      ) : (
        this.state.selections.map(assembly => (
          <ProductFamilyListA assemblieId={assembly.id} key={assembly.id} />
        ))
      )
    const list = this.state.showList ? (
      <div>
        <button onClick={e => this.toggleShowList(e)}>...</button>
        <AssemblyList
          assemblies={assemblies}
          selected={this.state.selected}
          select={this.setSelected}
        />
      </div>
    ) : (
      <div>
        <button onClick={e => this.toggleShowList(e)}>...</button>
      </div>
    )
    const more = this.state.selected.level > 4 ? null : list
    //clearing the selection effectively gets you back to the top of the tree
    return (
      <div className="Assemblies">
        <CodeChildSearch getAll={AssembliesJSON} select={this.selectByCode} />
        <div className="AssembliesPick">
          <button onClick={e => this.setSelected(initialState.selected)}>
            Top
          </button>
          <AssemblyCrumb
            selected={this.state.selected}
            onCrumb={this.selectCrumb}
          />
          {more}
        </div>
        <button onClick={this.addSelected}>Add Selected</button>
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

export default Assemblies
