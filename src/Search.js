import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import {PropTypes} from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    Books: [],
    query: ''
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    myBooks: PropTypes.array.isRequired
  }

  handleChange = (event) => {
    var value = event.target.value
    this.setState(() => {
      return {query: value}
    })
    this.BookSearch(value)
  }

  changeShelf = (books) => {
    let allBooks = this.props.myBooks
    for (let book of books) {
      book.shelf = "none"
    }

    for (let book of books) {
      for (let one of allBooks) {
        if (one.id === book.id) {
          book.shelf = one.shelf
        }
      }
    }
    return books
  }

  bookSearch = (val) => {
    if (val.length !== 0) {
      BooksAPI.search(val, 10).then((books) => {
        if (books.length > 0) {
          books = books.filter((book) => (book.imageLinks))
          books = this.changeShelf(books)
          this.setState(() => {
            return {Books: books}
          })
        }
      })
    } else {
      this.setState({Books: [], query: ''})
    }
  }

  addBook = (book, shelf) => {
    this.props.onChange(book, shelf)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.query.length > 0 && this.state.Books.map((book, index) => (<Book book={book} key={index} onUpdate={(shelf) => {
              this.addBook(book, shelf)
            }}/>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
