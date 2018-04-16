import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    //forgive the inline stylyes. this just quick make it look more like sbc
    return (
      <div className="flex pa1 justify-between nowrap blue">
        <div className="flex flex-fixed white">
          <div className="fw7 mr1">Selection Tool</div>
          <Link to="/" className="ml1 no-underline white">
            Categories
          </Link>
          <Link to="/Assemblies" className="ml1 no-underline white">
            Assemblies
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
