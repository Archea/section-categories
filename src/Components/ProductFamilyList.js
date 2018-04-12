import React, { Component } from 'react'
import ProductFamily from './ProductFamily'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export class ProductFamilyList extends Component {
  render() {
    if (this.props.getAll && this.props.getAll.loading) {
      return <div>Loading</div>
    }

    if (this.props.getAll && this.props.getAll.error) {
      console.log('GetAll ProductFamily error:' + this.props.getAll.error)
      return <div>Error</div>
    }
    //this.props.match.params.name
    const ProductFamilysToRender = this.props.getAll.productFamilyCategory
      .associatedFamilies
    return (
      <div className="ProductFamilyList">
        <h3>{this.props.getAll.productFamilyCategory.name}</h3>
        {ProductFamilysToRender.map(productFamily => (
          <ProductFamily key={productFamily.id} productFamily={productFamily} />
        ))}
      </div>
    )
  }
}

const PRODUCTFAMILIES_QUERY = gql`
  query GetPFs($categoryId: String!) {
    productFamilyCategory(id: $categoryId) {
      name
      associatedFamilies {
        id
        familyId
        name
      }
    }
  }
`
export default graphql(PRODUCTFAMILIES_QUERY, { name: 'getAll' })(
  ProductFamilyList
)
