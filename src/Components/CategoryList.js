import React, { Component } from 'react'
import Category from './Category'
import ProductFamilyList from './ProductFamilyList'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export class CategoryList extends Component {
  render() {
    if (this.props.getAll && this.props.getAll.loading) {
      return <div>Loading</div>
    }

    if (this.props.getAll && this.props.getAll.error) {
      console.log('Get All Categories error: ' + this.props.getAll.error)
      return <div>Error</div>
    }

    const categoriesToRender = this.props.getAll.allProductFamilyCategories
    //When we need teh activeCategory can use below (if not null...)
    //const activeCategory = this.props.match.params.id
    return (
      <div className="CategoryList">
        {categoriesToRender.map(category => (
          <Category key={category.id} Category={category} />
        ))}
      </div>
    )
  }
}

const CATEGORIES_QUERY = gql`
  query GetAllPFC {
    allProductFamilyCategories {
      id
      name
    }
  }
`
export default graphql(CATEGORIES_QUERY, { name: 'getAll' })(CategoryList)
