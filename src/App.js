import React from 'react'
import {Route} from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import * as Utilities from './Utilities';

import './App.css'
import BookCase from './Components/BookCase';
import Search from './Components/Search';

class BooksApp extends React.Component {
  state = {

    showSearchPage: false
  }

  componentDidMount = () => {
    if (this.state.newBook) {
      this.refreshAllBooks();
    }
  }

  refreshAllBooks = () => {

    BooksAPI
      .getAll()
      .then((list) => {
        this.setState({
          books: Utilities.sortAllBooks(list),
          newBook: false
        });
      });
  }

  changeShelf = (book, shelf) => {

    BooksAPI
      .update(book, shelf)
      .then(response => {

        let newList = this
          .state
          .books
          .slice(0);



        const books = newList.filter(listBook => listBook.id === book.id);
        if (books.length) {

          books[0].shelf = shelf;
        } else {

          newList.push(book);
          //newList = Utilities.sortAllBooks(newList);
        }

        this.setState({books: newList});
      })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path='/'
          render={(() => (<BookCase
          books={this.state.books}
          onChangeShelf={this.changeShelf}
          onRefreshAllBooks={this.refreshAllBooks}/>))}/>

        <Route
          exact
          path='/search'
          render={(() => (<Search selectedBooks={this.state.books} onChangeShelf={this.changeShelf}/>))}/>

      </div>
    )
  }
}

export default BooksApp
