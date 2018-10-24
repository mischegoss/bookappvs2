import React, {Component} from 'react'
import Changer from './Changer';

// Component to render individual book
class Book extends Component {

  render() {
    const {book, updateOption} = this.props
    let shelfValue = (book.shelf)
      ? book.shelf
      : 'move'

    return (
      <li>
        <div className="book">
          <div className="book-top">
            {book.imageLinks && (
              <div
                className="book-cover"
                style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}></div>
            )}
            <div className="book-shelf-changer">
              <Changer/>
          </div>
          <div className="book-title">{book.title}</div>
          {book.author && book
            .authors
            .map((author, index) => (
              <div key={index} className="book-authors">{author}</div>
            ))}
        </div>
      </li>
    )
  }
}

export default Book;
