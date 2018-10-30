import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import Shelf from './BookShelves'
class Search extends  Component {

    // As shelf of the book may change over time, books are stored in state rather than in prop.
    state = {
        books:[],
        searchResult:[],
        hasError:false
    }

    // Current books are fetched from Homepage after component is inserted into DOM
    componentDidMount(){
        this.setState({
            })
    }

    // Handler function for searching book through BooksAPI
    onSearch = (event) => {
        const searchQuery = event.target.value
        if(searchQuery) {
            BooksAPI.search(searchQuery).then((resultBooks)=>{
                if(!resultBooks || resultBooks.hasOwnProperty('error')){
                    this.setState({searchResult: [], hasError: true })
                } else {
                    this.setState({hasError:false})
                    this.syncBookShelfProperty()
                }
            })
        } else {
            this.setState({searchResult: [] })
        }
    }

    // Sync search result book .shelf property with current shelf books
    syncBookShelfProperty = () => {
        const books= this.state.books
        const searchResult = this.state.searchResult
        if(searchResult.length > 0) {
                books.forEach((book) => {
                    searchResult.forEach((searchResultBook) =>{
                        if(book.id === searchResultBook.id) {
                            searchResultBook.shelf = book.shelf
                        }
                    })
                })
        }
        this.setState({searchResult: searchResult})
    }

    // Handler function for changing book shelf
    onChangeShelf = (book,shelf) => {
        BooksAPI.update(book,shelf).then((result) => {
             // Change the shelf property of the book object to new Shelf.
            book.shelf = shelf
            //  Get the previous state book array without current book & add it to the new updated books array
            var updatedBooks = this.state.books.filter((resultBook) =>resultBook.id !== book.id)
            updatedBooks.push(book)
            // Set the new state with Updated Books array
            this.setState({books: updatedBooks})
        })

    }


     render() {
  const {filteredBooks, searchBooks, updateOption} = this.props

  return (
    <div>

      <div className="search-books-bar">
        <Link to='/' className='close-search'>Close</Link>
        <div className='search-books-input-wrapper'>
          <input
            className='search-books-results'
            type='text'
            placeholder='Search books..'
            onChange={(event) => searchBooks(event.target.value)}/>
        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {filteredBooks.map(book => (<Shelf book={book} key={book.id} updateOption={updateOption}/>))}
        </ol>
      </div>

    </div>
  )
}
}

export default Search
