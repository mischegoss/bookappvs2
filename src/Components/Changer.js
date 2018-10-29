import React /*{ Component }*/ from 'react';
import { Link } from 'react-router-dom';

function Changer(props) {

<div className="book-shelf-changer">
                <select onChange={this.changeShelf} value={book.shelf}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
  )};

export default Changer;
