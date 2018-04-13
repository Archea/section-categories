import React, { Component } from 'react'

class Assembly extends Component {
  handleClick = () => this.props.onSelect(this.props.Assembly)
  render() {
    return (
      <div className="Assembly">
        <div onClick={this.handleClick}>
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
