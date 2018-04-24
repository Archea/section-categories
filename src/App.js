import React, { Component } from 'react'
import './App.css'
import CategoryList from './Components/CategoryList'
import Assemblies from './Components/Assemblies'
import Header from './Components/Header'
import ProductFamilyList from './Components/ProductFamilyList'
import Search from './Components/Search/Search'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="SelectionArea">
          <Route exact path="/" component={Search} />
          <Route exact path="/Assemblies" component={Assemblies} />
          <Route path="/:area/:id" component={CategoryList} />
          <Route
            path="/Category/:id"
            render={props => (
              <ProductFamilyList
                {...props}
                categoryId={props.match.params.id}
              />
            )}
          />
        </div>
      </div>
    )
  }
}
export default App
