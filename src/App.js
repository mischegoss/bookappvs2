import React from "react";
import { Switch, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookCase from "./components/BookCase";
import Search from "./components/Search";

class BooksApp extends React.Component {
  state = {};

  componentDidMount = () => {
    if (this.state.newBook) {
      this.refreshBooks();
    }
  };
//Gets the books on shelves, Special thanks to Doug Brown walkthrough
  refreshBooks = () => {
    BooksAPI.getAll().then(list => {
      this.setState({
        books: list,
        newBook: false
      });
    });
  };
// Update the shelf for book
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      let newList = this.state.books.slice(0);

      const books = newList.filter(listBook => listBook.id === book.id);
      if (books.length) {
        books[0].shelf = shelf;
      } else {
        newList.push(book);
      }

      this.setState({ books: newList });
    });
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BookCase
                books={this.state.books}
                onChangeShelf={this.changeShelf}
                onRefreshBooks={this.refreshBooks}
              />
            )}
          />

          <Route
            exact
            path="/search"
            render={() => (
              <Search
                selectedBooks={this.state.books}
                onChangeShelf={this.changeShelf}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
