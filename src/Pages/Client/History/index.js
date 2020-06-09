import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import Topbar from "../Header/index";

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },  
   table: {
    width: "100%",
    height: "100%"
  },
});

function createData(name, tipo, valor, data, criptografia) {
  return { name, tipo, valor, data, criptografia };
}

const rows = [
  createData('BTC_5', 'Renda variavél', '$--,--', '--/--/----', 'v97f216f09127v7211asd!2'),
  createData('ETH_3', 'Renda variavél', '$--,--', '--/--/----', 'v97vfe2323DC32f32f432!#'),
];

class History extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Grid container justify="center" spacing={1}>
            <Grid
              spacing={4}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid item xs={12} md={12}>
                  <div className={classes.box}>
                    <Typography
                      style={{ textTransform: "uppercase" }}
                      color="secondary"
                      gutterBottom
                    >
                      Histórico de investimentos
                    </Typography>
                    <Grid
                      justify="center"
                      container
                    >
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome do investmento</TableCell>
                              <TableCell align="right">Tipo de investimento</TableCell>
                              <TableCell align="right">Valor</TableCell>
                              <TableCell align="right">Data</TableCell>
                              <TableCell align="right">Transação</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">{row.tipo}</TableCell>
                                <TableCell align="right">{row.valor}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                                <TableCell align="right">{row.criptografia}</TableCell>
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
  
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(History));
