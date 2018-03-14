import React, { Component } from 'react'
import './App.css'
import CategoryList from './Components/CategoryList'
import Header from './Components/Header'
import ProductFamilyList from './Components/ProductFamilyList'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="SelectionArea">
          <Route exact path="/" component={CategoryList} />
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
//"48390048-1a4e-4a06-8f1e-ab8fcfc4ad1f"
export default App
