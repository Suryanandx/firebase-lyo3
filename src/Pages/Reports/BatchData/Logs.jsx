import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import Sidebar from '../../../components/Sidebar/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const BatchListView = ({match}) => {
  console.log(match)
  const classes = useStyles();
  const [customers] = useState(data);

  return (
    <>
    <Sidebar match={match}/>
    <Page
      className={classes.root}
      title="Call Logs"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results match={match} customers={customers} />
        </Box>
      </Container>
    </Page>
    </>
  );
};

export default BatchListView;