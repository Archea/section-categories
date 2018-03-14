import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

export class Category extends Component {
  render() {
    return (
      <div>
        <Link to={`/Category/${this.props.Category.id}`}>
          <div>{this.props.Category.name}</div>
        </Link>
      </div>
    )
  }

  _pickCategory = async () => {
    // ... you'll implement this
  }
}

export default withRouter(Category)