import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "../Header/index";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";

import Chart from "./Chart";

import api from "../../../services/api";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 450,
  },
}));

export default function Dashboard() {
  const user = localStorage.getItem("session");
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [title, setCriptoAtivo] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [transaction, setTransaction] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (user == null) {
    history.push("/");
  }

  async function handleTransaction() {
    const data = {
      title,
      type,
      value,
    };

    await api
      .post("/transaction", data, {
        headers: {
          Authorization: user,
        },
      })
      .then((res) => {
        setTransaction(res.data.hash);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Typography component="h1" variant="h4" align="center">
                  Investiments
                </Typography>
                <InputLabel id="demo-customized-select-label">
                  select Active Crypto
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={title}
                  onChange={(e) => setCriptoAtivo(e.target.value)}
                >
                  <MenuItem value="">
                    <em>------------</em>
                  </MenuItem>
                  <MenuItem value="LTZ">LTZ</MenuItem>
                  <MenuItem value="BTC">BTC</MenuItem>
                  <MenuItem value="ETH">ETH</MenuItem>
                </Select>
                <div style={{ paddingTop: "15px" }}>
                  <Typography>Enter the value:</Typography>
                  <TextField
                    required
                    id="value"
                    helperText="Formto aceito ex: --,--"
                    placeholder="Insira somente números"
                    fullWidth
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <Typography>Enter the transaction type:</Typography>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value="">
                    <em>------------</em>
                  </MenuItem>
                  <MenuItem value="income">to apply</MenuItem>
                  <MenuItem value="outcome">withdraw</MenuItem>
                </Select>
                {transaction.length === 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ top: "30px" }}
                    onClick={handleTransaction}
                  >
                    Concluir
                  </Button>
                ) : (
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    transaction successfully completed your transaction hash:
                    <strong>{transaction}</strong>
                  </Alert>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
