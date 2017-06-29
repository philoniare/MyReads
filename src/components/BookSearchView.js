import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import TextField from 'material-ui/TextField';
import BookShelf from './BookShelf';
import * as BooksAPI from '../utils/BooksAPI';

class BookSearchView extends Component {
  constructor(props) {
    super(props);
    this.queryBooks = this.queryBooks.bind(this);
  }

  state = {
    query: '',
    books: [],
  };

  queryBooks(event) {
    const query = event.target.value;
    const maxResults = 10;
    if (query) {
      console.log(JSON.stringify({query, maxResults}));
      BooksAPI.search(query, maxResults).then(books => {
        console.log(books);
        if (books.error) this.setState({books: []});
        else this.setState({books});
      });
    } else {
      this.setState({books: []});
    }
    this.setState({query});
  }

  render() {
    return (
        <div className="app">
          <AppBar position="static" color="primary">
            <Toolbar>
              <Link to="/">
                <IconButton color="contrast" aria-label="Back">
                  <ArrowBack />
                </IconButton>
              </Link>
              <TextField
                  placeholder="Search Query"
                  value={this.state.query}
                  onChange={this.queryBooks}
              />
            </Toolbar>
          </AppBar>
          <BookShelf category="search"
                     onShelfChange={this.props.onShelfChange}
                     books={this.state.books}
          />
        </div>
    );
  }
}

export default BookSearchView;