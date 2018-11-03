import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

class Search extends Component {
  state = {
    books: [],
    query: ""
  };
/*This creates a hashtable to merge what is seen on the shelves with search results */
  mergePages = (shelf, search) => {
    const hashTable = {};
    shelf.forEach(book => (hashTable[book.id] = book.shelf));
    search.forEach(book => {
      book.shelf = hashTable[book.id] || "none";
    });

    return search;
  };

  queryTimer = null;
/*This sets a very short delay */
  changeQuery = value => {
    clearTimeout(this.queryTimer);
    this.setState({ query: value });
    this.queryTimer = setTimeout(this.updateSearch, 200);
  };
/*Search functions */
  updateSearch = () => {
    if (this.state.query === "") {
      this.setState({ error: false, books: [] });
      return;
    }

    BooksAPI.search(this.state.query).then(response => {
      let newList = [];
      let newError = false;

      if (
        response === undefined ||
        (response.error && response.error !== "empty query")
      ) {
        newError = true;
      } else if (response.length) {
        newList = this.mergePages(this.props.selectedBooks, response);
      }

      this.setState({ error: newError, books: newList });
    });
  };

  componentWillReceiveProps = props => {
    this.props = props;
    let newList = (this.props.selectedBooks, this.state.books);
    this.setState({ books: newList });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Enter Search Here"
              onChange={e => this.changeQuery(e.target.value)}
              value={this.state.query.value}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.error && (
            <div className="search-error">Oh no! Something went wrong</div>
          )}
          {!this.state.error && (
            <span className="search-count">
              There are &nbsp;{this.state.books.length}&nbsp; books that match
              your search
            </span>
          )}

          <ol className="books-grid">
            {this.state.books &&
              this.state.books.map(book => (
                <li key={book.id}>
                  <Book book={book} onChangeShelf={this.props.onChangeShelf} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
