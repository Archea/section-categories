import React, { Component } from 'react'
import Assembly from './Assembly'

export class AssemblyList extends Component {
  render() {
    const assembliesToRender = this.props.assemblies
    // level 0 is the very top of the tree aka no selection
    if (this.props.selected && this.props.selected.level === 0) {
      //when there is no selection we pick only the top level assemblies
      return (
        <div className="AssemblyList">
          {InitialSplit(assembliesToRender).map(assembly => (
            <Assembly
              key={assembly.id}
              Assembly={assembly}
              onSelect={this.props.select}
            />
          ))}
        </div>
      )
    }
    //Render this when there is a selection and it is in a valid level range
    if (
      this.props.selected &&
      this.props.selected.level > 0 &&
      this.props.selected.level < 6
    ) {
      return (
        <div className="AssemblyList">
          {SplitAssmblies(assembliesToRender, this.props.selected).map(
            assembly => (
              <Assembly
                key={assembly.id}
                Assembly={assembly}
                onSelect={this.props.select}
              />
            )
          )}
        </div>
      )
    }
    //this should not be called in current architecture, but may be useful
    return (
      <div className="AssemblyList">
        //it just renders all of them
        {assembliesToRender.map(assembly => (
          <Assembly
            key={assembly.id}
            Assembly={assembly}
            onSelect={this.props.select}
          />
        ))}
      </div>
    )
  }
}

/*
Given the selected asseimbly's code and level
Select the relevent sub assemblies, aka imediate children in the tree
The only matching assembly on the same level is the selected assembly itself
...don't render that.
*/
const SplitAssmblies = (assemblies, selected) => {
  return assemblies.filter(
    assembly =>
      assembly.code.startsWith(selected.code) &&
      assembly.level < selected.level + 2 &&
      assembly.level !== selected.level
  )
}
/*
Get all level 1 assemblies as starting point.
*/
const InitialSplit = assemblies => {
  return assemblies.filter(assembly => assembly.level === 1)
}

export default AssemblyList
