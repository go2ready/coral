import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { CanvasManagerContainer } from './components/containers/CanvasManagerContainer';

import './App.css';

const styles = (theme: Theme) => createStyles({
  root: {
    ...theme.mixins.gutters(),
    textAlign: 'center',
  },
  centerRoot: {
    ...theme.mixins.gutters(),
    textAlign: 'center',
    maxWidth: '500px',
  },
  shareIcon: {
    textAlign: 'center',
    display: 'inline',
  },
});

export interface IAppProps extends WithStyles<typeof styles> {
}

export const App = withStyles(styles)(
  class App extends Component<IAppProps> {
    // constructor(props : IAppProps) {
    //   super(props);
    // }

    render() {
      const { classes } = this.props;
      return (
        <React.Fragment>
          <CssBaseline />
          {
            <div>
              <Paper className={classes.root} elevation={1}>
                <div>
                  <CanvasManagerContainer />
                  <div id="canvasWrapper" touch-action="none">
                  </div>
                </div>
              </Paper> 
            </div>
          }
        </React.Fragment>
      );
    }

  }
);
