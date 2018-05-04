import React, { Component } from 'react'
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
    escapedValue.length < 3
      ? new RegExp('^' + escapedValue, 'i')
      : new RegExp(escapedValue, 'i')

  if (escapedValue === '') {
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

export class AssemblyChildSearch extends Component {
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
        <div className="AssemblyChildSearch">
          <h4>Search</h4>
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
      <div className="AssemblyChildSearch">
        <h4>Search</h4>
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

export default AssemblyChildSearch
