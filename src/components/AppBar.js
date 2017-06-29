import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';

const styleSheet = createStyleSheet('ButtonAppBar', {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

function ButtonAppBar(props) {
  const classes = props.classes;
  return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>Title</Typography>
            <Link to="/search"><Button color="contrast">Search</Button></Link>
          </Toolbar>
        </AppBar>
      </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ButtonAppBar);