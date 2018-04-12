import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div className="flex pa1 justify-between nowrap blue">
        <div className="flex flex-fixed white">
          <div className="fw7 mr1">Selection Tool</div>
          <Link to="/" className="ml1 no-underline white">
            Clear Selection
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
