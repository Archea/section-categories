import React, { Component } from 'react'
import './App.css'
import CategoryList from './Components/CategoryList'
import Assemblies from './Components/Assemblies'
import Header from './Components/Header'
import ProductFamilyList from './Components/ProductFamilyList'
import Search from './Components/Search/Search'
import AssemblySearch from './Components/Search/AssemblySearch'
import SectionSearch from './Components/Search/SectionSearch'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="SelectionArea">
          <Route exact path="/" component={Search} />
          <Route exact path="/All" component={Search} />
          <Route exact path="/Sections" component={SectionSearch} />
          <Route exact path="/Assemblies" component={Assemblies} />
          <Route exact path="/AssemblySearch" component={AssemblySearch} />
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
