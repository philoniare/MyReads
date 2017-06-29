import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookItem from './BookItem';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import SHELVES from '../Shelves';

const styleSheet = createStyleSheet('GuttersGrid', theme => ({
  root: {
    flexGrow: 1,
  },
  main: {
    marginRight: 30,
    marginLeft: 30,
  },
  divider: {
    marginBottom: '20px',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
}));

class BookShelf extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
  };

  findShelfName(shelf) {
    return SHELVES.filter(item => item[0] === shelf).map(item => item[1])[0];
  }

  render() {
    const classes = this.props.classes;
    const {books, category} = this.props;
    return (
        <div className={classes.main}>
          <h1>{this.findShelfName(this.props.category)}</h1>
          <Divider className={classes.divider}/>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Grid container className={classes.demo} justify="center">
                {books.map((book, index) =>
                    <Grid key={index} item>
                      <BookItem
                          category={category}
                          onShelfChange={this.props.onShelfChange}
                          book={book}/>
                    </Grid>,
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
    );
  }
}

export default withStyles(styleSheet)(BookShelf);