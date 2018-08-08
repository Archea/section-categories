import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'
const httpLink = new HttpLink({
  //This is the api end point that apollo will use to connect to graphql api
  uri: 'https://avitrucontent20api.azurewebsites.net/api/graphql'
})
const httpLinkStaging = new HttpLink({
  //This is the api end point that apollo will use to connect to graphql api
  uri: 'https://avitrucontent20apistaging.azurewebsites.net/api/graphql'
}) //avitrucontent20apistaging.azurewebsites.net/

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()

//const f2 = fetch('http://avitrucontent20api.azurewebsites.net/api/graphql').then( response => console.log(JSON.stringify(response)),)
/*
Pushed Firms and Masters GraphQL update to production!
Added Firm Avitru with ID ec7782f7-d919-4a58-bb8e-fe888633481f and added all existing Cateogries and Assembly codes to it.
Added Master MasterSpec with ID f069a64d-01d0-449b-89c4-6fbe3571af64 and added all existing families, groups, group orgs, nuggets, and PTPs to it.
All queries (other than lookups by ID) now require the appropriate firmId or masterId parameter. Let me know if you guys have any questions!
*/
