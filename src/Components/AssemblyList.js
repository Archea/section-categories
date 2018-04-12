import React, { Component } from 'react'
import Assembly from './Assembly'

export class AssemblyList extends Component {
  render() {
    const assembliesToRender = this.props.assemblies
    return (
      <div className="AssemblyList">
        {assembliesToRender.map(assembly => (
          <Assembly key={assembly.id} Assembly={assembly} />
        ))}
      </div>
    )
  }
}

export default AssemblyList
