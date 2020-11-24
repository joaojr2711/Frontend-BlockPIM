import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from '../Header/index';
import Link from '@material-ui/core/Link';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import api from '../../../services/api';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  barContainer:{
    position: 'relative',
    display: 'flex',
  },
  bar:{
    position: 'relative',
    paddingLeft: '50%'
  },
  fixedHeight: {
    height: 240,
  },
  depositContext: {
    flex: 1,
  },
}));

export default function History() {
  const user = localStorage.getItem('session');
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [historyInvest, setHistoryInvest] = useState([]);
  const [textInput, setTextInput] = useState('');

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (user == null) {
    history.push('/')
  }

  useEffect(() => {
    const loadTransactions = async () => {
      const response = await api.get('/admHistory');
        setHistoryInvest(response.data.transaction)
    }

    loadTransactions();
  }, []);

  const executeSearch = () => {
    console.log('text to filter', textInput);
    if(textInput){
      const filtrado = historyInvest.filter(data => {
        if(data.type === textInput){
          return data;
        }
        else if(data.date === textInput){
          return data;
        }
        else if(data.name === textInput){
          return data;
        }
      });
      console.log("IF Filter", filtrado)
      return setHistoryInvest(filtrado);
    }
  }

  const setText = (event) => {
    setTextInput(event)
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            History
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container justify="center" spacing={1}>
          <Grid
            spacing={4}
            alignItems="center"
            justify="center"
            container
            className={classes.grid}
          >
            <Grid item xs={12} md={12}>
              <div className={classes.barContainer}>
                <Typography
                    style={{ textTransform: "uppercase" }}
                    color="primary"
                    gutterBottom
                  >
                    Investment history
                  </Typography>
                <div style={{paddingLeft:'750px', margin:'10px'}}>
                  <TextField
                    id="txtSearch"
                    onChange={e => setText(e.target.value)}
                    id="standard-basic" label="Search"
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={executeSearch}
                    style={{width:'50px', height: '50px'}}
                  >
                    <SearchIcon/>
                  </Button>
                </div>
              </div>
              <div className={classes.box}>
                <Grid justify="center" container>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Nome do investmento</TableCell>
                          <TableCell align="right">
                            Tipo de investimento
                          </TableCell>
                          <TableCell align="right">Data</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {historyInvest.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell component="th" scope="row">
                              {item.name}
                            </TableCell>
                            <TableCell align="right">{item.type}</TableCell>
                            <TableCell align="right">{item.date}</TableCell>
                          </TableRow>
                        ))} 
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      </main>
    </div>
  );
}