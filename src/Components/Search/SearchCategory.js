import React, { Component } from 'react'
import Category from '../Category'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Autosuggest from 'react-autosuggest'

const initialState = {
  value: '',
  suggestions: []
}

const getSuggestions = (value, categories) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0
    ? []
    : categories.filter(
        cate => cate.name.toLowerCase().slice(0, inputLength) === inputValue
      )
}

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = suggestion => <div> {suggestion.name} </div>

export class SearchCategory extends Component {
  state = initialState
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(
        value,
        this.props.getAll.allProductFamilyCategories
      )
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'Type a Category',
      value,
      onChange: this.onChange
    }

    if (this.props.getAll && this.props.getAll.loading) {
      return <div>Loading</div>
    }

    if (this.props.getAll && this.props.getAll.error) {
      console.log('Get All Categories error: ' + this.props.getAll.error)
      return <div>Error</div>
    }

    const categoriesToRender = this.props.getAll.allProductFamilyCategories
    //When we need teh activeCategory can use below (if not null...)
    return (
      <div className="SearchCategory">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}
/*
This query gets all the ProductFamilies aka sections from content20 db
the 'name' is the section title, while the id is the mf section#
*/
const CATEGORIES_QUERY = gql`
  query GetAllPFC {
    allProductFamilyCategories {
      id
      name
    }
  }
`
export default graphql(CATEGORIES_QUERY, { name: 'getAll' })(SearchCategory)
