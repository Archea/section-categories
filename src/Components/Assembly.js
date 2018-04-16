import React, { Component } from 'react'

class Assembly extends Component {
  //this should prop function comes from Assemblies
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
}

export default Assembly
