import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookCase from './Components/BookCase'
import Search from './Components/Search'
import './App.css'

class BooksApp extends Component {
  state = {
    query: "",
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
        .then((filteredBooks) => {
          this.updateQuery(filteredBooks)
          if (filteredBooks.error) {
            this.setState({filteredBooks: []})
          } else {
            this.setState({filteredBooks})
          }
        })
    } else {
      this.setState({filteredBooks: []})
    }
  }

updateQuery = (query) => {
        this.setState({ query })
        this.searchBooks(query)
    }

  updateShelf = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(updated => (BooksAPI.getAll().then((books) => {
        this.setState({allBooks: books})
        this.updateQuery(this.state.filteredBooks)
      })))
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

        </Switch>
      </div>
    )
  }
}

export default BooksApp
