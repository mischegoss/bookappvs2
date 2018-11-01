import React, {Component} from 'react'
//import {Link} from 'react-router-dom';
import Shelf from "./Shelf";
import SearchButton from "./SearchButton";
import MainTitle from "./MainTitle";

class BookCase extends Component {
    state = {}

    componentDidMount = () => {
        // Update the list of all books
        this
            .props
            .onRefreshAllBooks();
    }

    updateShelves = () => {

        const newCurrent = {
            name: "Currently Reading",
            books: this
                .props
                .books
                .filter(book => book.shelf === 'currentlyReading')
        };
        const newWant = {
            name: "Want to Read",
            books: this
                .props
                .books
                .filter(book => book.shelf === "wantToRead")
        };
        const newRead = {
            name: "Read",
            books: this
                .props
                .books
                .filter(book => book.shelf === "read")
        };

        return ([newCurrent, newWant, newRead]);
    }

    render() {
        let shelves = [];
        if (this.props.books && this.props.books.length)
            shelves = this.updateShelves();

        return (
            <div className="app">
                <MainTitle title="MyReads"/>
                    <div className="list-books-content">
                        <div>
                            {shelves && shelves.map((shelf) => (<Shelf
                                key={shelf.name}
                                shelf={shelf}
                                onChangeShelf={this.props.onChangeShelf}
                            />))}
                        </div>
                    </div>
                    <SearchButton/>
                </div>


        )
    }
}

export default BookCase;
