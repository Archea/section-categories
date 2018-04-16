import React, { Component } from 'react'

class ProductFamily extends Component {
  render() {
    return (
      <div>
        <div className="ProductFamily">
          ({this.props.productFamily.familyId}){' '}
          {this.props.productFamily.delimiter} {this.props.productFamily.name}
        </div>
      </div>
    )
  }
}

export default ProductFamily
