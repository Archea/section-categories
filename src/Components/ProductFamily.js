import React, { Component } from 'react'

class ProductFamily extends Component {
  render() {
    return (
      <div>
        <div>
          ({this.props.productFamily.familyId}){' '}
          {this.props.productFamily.delimiter} {this.props.productFamily.name}
        </div>
      </div>
    )
  }

  _pickProductFamily = async () => {
    // ... you'll implement this
  }
}

export default ProductFamily
