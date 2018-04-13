import React, { Component } from 'react'
import Assembly from './Assembly'

export class AssemblyList extends Component {
  render() {
    const assembliesToRender = this.props.assemblies
    if (this.props.selected && this.props.selected.level === 0) {
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
    return (
      <div className="AssemblyList">
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
Given the selected asseimblies code and level
Select the relevent sub assemblies
*/
const SplitAssmblies = (assemblies, selected) => {
  return assemblies.filter(
    assembly =>
      assembly.code.startsWith(selected.code) &&
      assembly.level < selected.level + 2
  )
}
/*
Get all level 1 assemblies as starting point.
*/
const InitialSplit = assemblies => {
  return assemblies.filter(assembly => assembly.level == 1)
}

export default AssemblyList
