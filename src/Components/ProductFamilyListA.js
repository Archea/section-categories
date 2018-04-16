import React, { Component } from 'react'
import ProductFamily from './ProductFamily'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
/*
  This class is the same as the other ProductFamilyList except that it is for
  gettting the families out assemblies instead of categories
  */
export class ProductFamilyListA extends Component {
  render() {
    if (this.props.getAll && this.props.getAll.loading) {
      return <div>Loading: ProductFamilies {this.props.assemblieId}</div>
    }

    if (this.props.getAll && this.props.getAll.error) {
      console.log('GetAll ProductFamily error:' + this.props.getAll.error)
      return <div>Error</div>
    }
    const ProductFamilysToRender = this.props.getAll.uniformatClassification
      .associatedFamilies
    if (ProductFamilysToRender.length === 0)
      return <div> no associate families </div>
    return (
      <div className="ProductFamilyListA">
        <h3>{this.props.getAll.uniformatClassification.code}</h3>
        {ProductFamilysToRender.map(productFamily => (
          <ProductFamily key={productFamily.id} productFamily={productFamily} />
        ))}
      </div>
    )
  }
}
/*
  assemblies are called uniformatClassification in content2.0
  this query gets the array of associate 'families' aka sections
  for a given ID
  You get errors if you call a bad ID which isn't handled gracefully in the example
*/
const PRODUCTFAMILIES_QUERY = gql`
  query GetPFs($assemblieId: String!) {
    uniformatClassification(id: $assemblieId) {
      code
      associatedFamilies {
        id
        familyId
        name
      }
    }
  }
`

export default graphql(PRODUCTFAMILIES_QUERY, { name: 'getAll' })(
  ProductFamilyListA
)
