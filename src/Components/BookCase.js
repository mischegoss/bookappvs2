import React, { Component } from "react";
import Shelf from "./Shelf";
import SearchButton from "./SearchButton";
import MainTitle from "./MainTitle";

class BookCase extends Component {
  state = {};

  componentDidMount = () => {
    this.props.onRefreshBooks();
  };
// This is the method to update information on individual shelfs. Using method from Doug Brown walkthrough
  shelfUpdater = () => {
    const shelfCurrent = {
      name: "Currently Reading",
      books: this.props.books.filter(book => book.shelf === "currentlyReading")
    };
    const shelfWant = {
      name: "Want to Read",
      books: this.props.books.filter(book => book.shelf === "wantToRead")
    };
    const shelfRead = {
      name: "Read",
      books: this.props.books.filter(book => book.shelf === "read")
    };

    return [shelfCurrent, shelfWant, shelfRead];
  };

  render() {
    let shelves = [];
    if (this.props.books && this.props.books.length)
      shelves = this.shelfUpdater();
    return (
      <div className="app">
        <MainTitle title="MyReads" />
        <div className="list-books-content">
          <div>
            {shelves &&
              shelves.map(shelf => (
                <Shelf
                  key={shelf.name}
                  shelf={shelf}
                  onChangeShelf={this.props.onChangeShelf}
                />
              ))}
          </div>
        </div>
        <SearchButton />
      </div>
    );
  }
}

export default BookCase;
