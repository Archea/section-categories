import React, { Component } from 'react'
import ProductFamily from './ProductFamily'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
/*
  This class is the same as the other ProductFamilyListA except that it is for
  gettting the families out categories instead of assemblies
  */
export class ProductFamilyList extends Component {
  render() {
    if (this.props.getAll && this.props.getAll.loading) {
      return <div>Loading</div>
    }

    if (this.props.getAll && this.props.getAll.error) {
      console.log('GetAll ProductFamily error:' + this.props.getAll.error)
      return <div>Error</div>
    }
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
/*
  Categories are called productFamilyCategory in content2.0
  this query gets the array of associate 'families' aka sections
  for a given ID
  You get errors if you call a bad ID which isn't handled gracefully in the example
*/
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
