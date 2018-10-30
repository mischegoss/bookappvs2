import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookCase from './Components/BookCase'
import Search from './Components/Search'
import './App.css'

class BooksApp extends Component {
  state = {
    allBooks: [],
    filteredBooks: []
  }

  // gets all the books
  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
        this.setState({allBooks: books})
      })
  }

  searchBooks = (query) => {
    if (query) {
      BooksAPI
        .search(query)
        .then((result) => {
          this.updateSearch(result)
          if (result.error !== 'empty query') {
            this.setState({filteredBooks: result})
          } else {
            this.setState({filteredBooks: []})
          }
        })
    } else {
      this.setState({filteredBooks: []})
    }
  }


  updateShelf = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(updated => (BooksAPI.getAll().then((books) => {
        this.setState({allBooks: books})
        this.updateSearch(this.state.filteredBooks)
      })))
  }


  updateSearch = (values) => {
    for (let value of values) {
      for (let book of this.state.allBooks) {
        if (value.id === book.id) {
          value.shelf = book.shelf
        }
      }
                   }
    this.setState({filteredBooks: values})
  }

  render() {
    return (
      <div className="app">

        <Switch>
          <Route
            exact
            path="/"
            render={() => (<BookCase
            books={this.state.allBooks}
            updateOption={(book, shelf) => this.updateShelf(book, shelf)}/>)}/>

          <Route
            path="/search"
            render={() => (
            <div >
              <Search
                filteredBooks={this.state.filteredBooks}
                searchBooks={(query) => this.searchBooks(query)}
                updateOption={(book, shelf) => this.updateShelf(book, shelf)}/>
            </div>
          )}/>

          <Route
            component={function NoMatch() {
            return (
              <div className="errorPage">
                <h1>404</h1>
                <h3>Page not Found</h3>
              </div>
            )
          }}/>

        </Switch>
      </div>
    )
  }
}

export default BooksApp
