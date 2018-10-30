import React, {Component} from 'react'

// Component to render individual book
class Shelf extends Component {

  render() {
    const {book, updateOption} = this.props
    let shelfValue = (book.shelf)
      ? book.shelf
      : 'move'

      const authors = this.props.book.authors && this
              .props
              .book
              .authors
              .join(' | ');


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
              <select
                value={shelfValue}
                onChange={(event) => updateOption(book, event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>


          </div>

          <div className="book-title">{book.title}</div>

          <div className="book-authors">{authors}</div>


          </div>
            ))}


      </li>
    )
  }
}

export default Shelf
