import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import {blue, red, green} from 'material-ui/styles/colors';
import createPalette from 'material-ui/styles/palette';
import BookShelf from './components/BookShelf'
import BookSearchView from './components/BookSearchView'
import AppBar from './components/AppBar'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';


const myReadsTheme = createMuiTheme({
    palette: createPalette({
        primary: blue,
        accent: {
            ...green,
            A400: '#00e677',
        },
        error: red,
    }),
});

class App extends Component {
    fetchAndDisplayShelves = () => {
        BooksAPI.getAll().then(books => {
            const shelves = {
                currentlyReading: [],
                wantToRead: [],
                read: []
            }
            books.forEach(book => {
                shelves[book.shelf].push(book)
            })
            this.setState({shelves})
        })
    }
    componentDidMount() {
        this.fetchAndDisplayShelves()
    }
    state = {
        shelves: {
            currentlyReading: [],
            wantToRead: [],
            read: [],
        },
    }
    render() {
        const baseUrl = process.env.PUBLIC_URL;
        const {currentlyReading, wantToRead, read} = this.state.shelves
        return (
            <MuiThemeProvider theme={myReadsTheme}>
                <div className="App">
                    <Route exact path={baseUrl + "/"} render={() => (
                        <div>
                            <AppBar color="primary" />
                            <BookShelf
                                onShelfChange={this.fetchAndDisplayShelves}
                                category="currentlyReading" books={currentlyReading} />
                            <BookShelf
                                onShelfChange={this.fetchAndDisplayShelves}
                                category="wantToRead" books={wantToRead} />
                            <BookShelf
                                onShelfChange={this.fetchAndDisplayShelves}
                                category="read" books={read} />
                        </div>
                    )}/>
                    <Route path={baseUrl + "/search"} render={() => (
                        <BookSearchView onShelfChange={this.fetchAndDisplayShelves} />
                    )}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
