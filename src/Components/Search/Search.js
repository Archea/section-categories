import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Autosuggest, {
  AutosuggestHighlightMatch,
  AutosuggestHighlightParse
} from 'react-autosuggest'

const initialState = {
  value: '',
  suggestions: []
}
// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const getSuggestions = (value, items) => {
  const escapedValue = escapeRegexCharacters(value.trim().toLowerCase())
  const regex = new RegExp('^' + escapedValue, 'i')

  if (escapedValue === '') {
    return []
  }
  const categoriesFiltered = items.allProductFamilyCategories.filter(category =>
    regex.test(category.name)
  )
  const categoriesSection = {
    title: 'Categories',
    items: categoriesFiltered
  }
  const assembliesFiltered = items.allUniformatClassifications.filter(
    assembly => regex.test(assembly.code) || regex.test(assembly.description)
  )
  const assembliesSection = {
    title: 'Assemblies',
    items: assembliesFiltered
  }
  const sectionsFiltered = items.allProductFamilies.filter(
    family => regex.test(family.familyId) || regex.test(family.name)
  )
  const sectionsSection = {
    title: 'Sections',
    items: sectionsFiltered
  }
  console.log({
    categoriesSection,
    assembliesSection,
    sectionsSection
  })

  return categoriesSection.items.length === 0 &&
    assembliesSection.items.length === 0 &&
    sectionsSection.items.length === 0
    ? []
    : [categoriesSection, assembliesSection, sectionsSection]
}

const getSuggestionValue = suggestion =>
  `${cv(suggestion.familyId)} ${cv(suggestion.name)} ${cv(
    suggestion.code
  )} ${cv(suggestion.description)}`

const cv = prop => {
  if (prop === undefined || null) return ''
  else return prop
}

const renderSuggestion = suggestion => {
  return <span>{suggestion}</span>
}

const renderSuggestionSpecial = (suggestion, { query }) => {
  const suggestionText = `${suggestion.familyId} ${suggestion.name} ${
    suggestion.code
  } ${suggestion.description}`
  const matches = AutosuggestHighlightMatch(suggestionText, query)
  const parts = AutosuggestHighlightParse(suggestionText, matches)

  return (
    <span className={'suggestion-content ' + suggestion}>
      <span className="suggestions">
        {parts.map((part, index) => {
          const className = part.highlight ? 'highlight' : null

          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          )
        })}
      </span>
    </span>
  )
}

const renderSectionTitle = section => <strong>{section.title}</strong>
const getSectionSuggestions = section =>
  section.items.map(item => getSuggestionValue(item))

export class Search extends Component {
  state = initialState
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.getAll)
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
      placeholder: 'search',
      value,
      onChange: this.onChange
    }

    if (this.props.getAll && this.props.getAll.loading) {
      return <div>Loading</div>
    }

    if (this.props.getAll && this.props.getAll.error) {
      console.log('Get All error: ' + this.props.getAll.error)
      return <div>Error</div>
    }

    return (
      <div className="Search">
        <Autosuggest
          multiSection={true}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderSectionTitle={renderSectionTitle}
          getSectionSuggestions={getSectionSuggestions}
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
  query GetAllEverything {
    allProductFamilyCategories {
      name
    }
    allUniformatClassifications {
      description
      code
    }
    allProductFamilies {
      familyId
      name
    }
  }
`
export default graphql(CATEGORIES_QUERY, { name: 'getAll' })(Search)