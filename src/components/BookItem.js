import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Card, { CardMedia} from 'material-ui/Card';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import * as BooksAPI from '../utils/BooksAPI'
import '../book-item.css'
import SHELVES from '../Shelves'

const styleSheet = createStyleSheet('BookItemCard', theme => ({
    card: {
        width: 190,
        height: 300,
        textAlign: 'center'
    },
    bookMain: {
        height: 260,
        marginBottom: 10
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    flexGrow: { flex: '1 1 auto' },
}));


const optionIndexes = {
    "currentlyReading": 0,
    "wantToRead": 1,
    "read": 2,
}

class BookItem extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired
    }
    state = {
        anchorEl: undefined,
        open: false,
    };

    componentDidMount() {
        this.setState({selectedIndex: optionIndexes[this.props.category]})
    }

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    addBookToShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            if(this.props.onShelfChange)
                this.props.onShelfChange()
        })
    }

    render() {
        const book = this.props.book
        const classes = this.props.classes
        return (
            <div className="book-item">
                <Card className={classes.card}>
                    <div className={classes.bookMain}>
                        {book.imageLinks && (
                            <CardMedia>
                                <img src={book.imageLinks.smallThumbnail} alt=""/>
                            </CardMedia>
                        )}
                        <div className="book-details">
                            <span className="book-title">{book.title}</span>
                            <span className="book-authors">by {!book.authors ? "Author N/A" : book.authors.join(", ")}</span>
                        </div>
                    </div>
                    <Button
                        aria-owns="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                        Move To
                    </Button>
                    <Menu id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={this.state.open}
                        onRequestClose={this.handleRequestClose}>
                        {SHELVES.map((option, index) =>
                            <MenuItem
                                key={index}
                                selected={index === this.state.selectedIndex}
                                onClick={() => {
                                    this.addBookToShelf(book, option[0])
                                    this.handleRequestClose()
                                }}>{option[1]}</MenuItem>
                        )}
                    </Menu>
                </Card>
            </div>
        )
    }
}

export default withStyles(styleSheet) (BookItem)