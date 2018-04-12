import React, { Component } from 'react'

class Assembly extends Component {
  render() {
    return (
      <div className="Assembly">
        <div>
          ({this.props.Assembly.level}) {this.props.Assembly.code}{' '}
          {this.props.Assembly.description}
        </div>
      </div>
    )
  }

  _pickAssembly = async () => {
    // ... you'll implement this
  }
}

export default Assembly
