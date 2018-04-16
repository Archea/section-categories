import React, { Component } from 'react'

class AssemblyCrumb extends Component {
  _pickAssembly = level => {
    //this prop comes down from the Assemblies container
    this.props.onCrumb(level)
  }
  render() {
    const code = !this.props.selected.code ? '' : this.props.selected.code
    /*
      Assembly codes follow a strict schema like mf section#s
      we can use that to decompse them by charactar position.
      This returns an array of the decomposed code pieces by level
    */
    const levels = [
      { text: code.slice(0, 1), level: 1 },
      { text: code.slice(1, 3), level: 2 },
      { text: code.slice(3, 5), level: 3 },
      { text: '', level: 0 },
      { text: code.slice(6, 8), level: 4 },
      { text: code.slice(8, 10), level: 5 }
    ]
    return (
      <div className="AssemblyCrumb">
        <div>
          {levels.map(
            l =>
              l.text === '' ? (
                '.'
              ) : (
                <button
                  key={l.level}
                  onClick={e => this._pickAssembly(l.level)}>
                  {l.text}
                </button>
              )
          )}
        </div>
      </div>
    )
  }
}

export default AssemblyCrumb

/*
Code slice locations
level one 0,1
level two 1,3
level three 3,5
level four 6,8
level five 8,10
*/
