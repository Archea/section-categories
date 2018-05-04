import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Autosuggest from 'react-autosuggest'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

const initialState = {
  value: '',
  suggestions: []
}
// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const getSuggestions = (value, items) => {
  if (!items) console.log('Error no items! Look: ' + items)
  const escapedValue = escapeRegexCharacters(value.trim().toLowerCase())
  const regex =
    escapedValue.length < 4
      ? new RegExp('^' + escapedValue, 'i')
      : new RegExp(escapedValue, 'i')

  if (escapedValue === '' || escapedValue.length < 2) {
    return []
  }

  const assembliesFiltered = items.allUniformatClassifications.filter(
    assembly => regex.test(assembly.code) || regex.test(assembly.description)
  )
  const assembliesSection = {
    title: 'Assemblies',
    items: assembliesFiltered
  }

  return assembliesSection.items.length === 0 ? [] : [assembliesSection]
}
//sub-product families, product sub-types, product-groups
const getSuggestionValue = suggestion =>
  `${cv(suggestion.code)}${cv(suggestion.description)}`
const cv = prop => (prop === undefined || null ? '' : `${prop} `)

const renderSuggestion = (suggestion, { query }) => {
  const suggestionText = suggestion
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

export class AssemblySearch extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    console.log(
      'where are the props? look: ' + JSON.stringify(this.props.getAll)
    )
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

    if (this.props.getAll && this.props.getAll.error) {
      console.log('Get All error: ' + this.props.getAll.error)
      return <div>Error</div>
    }

    if (this.props.getAll && this.props.getAll.loading) {
      return (
        <div className="AssemblySearch">
          <h3>Assembly Search</h3>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            autoComplete="off"
            className="react-autosuggest__input"
            placeholder="search"
          />
        </div>
      )
    }

    return (
      <div className="AssemblySearch">
        <h3>AssemblySearch All</h3>
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
const ASSEMBLIES_QUERY = gql`
  query GetAssemblies {
    allUniformatClassifications {
      description
      code
    }
  }
`
export default graphql(ASSEMBLIES_QUERY, { name: 'getAll' })(AssemblySearch)
