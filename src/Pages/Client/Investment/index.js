import React, { Component } from "react";
import numeral from "numeral";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Months from "./Months";
import Loading from "./Loading";

import Topbar from "../Header/index";

numeral.defaultFormat("0,000");

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    backgroundSize: "cover",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  block: {
    padding: theme.spacing(2)
  },
  loanAvatar: {
    display: "inline-block",
    verticalAlign: "center",
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: "inline-block",
    verticalAlign: "center",
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: "inline-block",
    marginRight: 10
  },
  buttonBar: {
    display: "flex"
  },
  noBorder: {
    borderBottomStyle: "hidden"
  },
  mainBadge: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
});

const monthRange = Months;


class InvestmentsClient extends Component {
  state = {
    loading: true,
    amount: 0,
    period: 3,
    start: 0,
    monthlyInterest: 0,
    totalInterest: 0,
    monthlyPayment: 0,
    totalPayment: 0,
    data: []
  };

  updateValues() {
    const { amount, period, start } = this.state;
    const monthlyInterest =
      (amount * Math.pow(0.01 * 1.01, period)) / Math.pow(0.01, period - 1);
    const totalInterest = monthlyInterest * (period + start);
    const totalPayment = amount + totalInterest;
    const monthlyPayment =
      period > start ? totalPayment / (period - start) : totalPayment / period;

    const data = Array.from({ length: period + start }, (value, i) => {
      const delayed = i < start;
      return {
        name: monthRange[i],
        Type: delayed ? 0 : Math.ceil(monthlyPayment).toFixed(0),
        OtherType: Math.ceil(monthlyInterest).toFixed(0)
      };
    });

    this.setState({
      monthlyInterest,
      totalInterest,
      totalPayment,
      monthlyPayment,
      data
    });
  }

  componentDidMount() {
    this.updateValues();
  }

  handleChangeAmount = (event, value) => {
    this.setState({ amount: value, loading: false });
    this.updateValues();
  };

  handleChangePeriod = (event, value) => {
    this.setState({ period: value, loading: false });
    this.updateValues();
  };

  handleChangeStart = (event, value) => {
    this.setState({ start: value, loading: false });
    this.updateValues();
  };

  render() {
    const { classes } = this.props;
    const {
      amount,
      period,
      start,
      monthlyPayment,
      monthlyInterest,
      data,
      loading
    } = this.state;
    const currentPath = this.props.location.pathname;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              spacing={10}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid item xs={12} md={5  }>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      Nome do investimento:
                    </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color="secondary" variant="h6" gutterBottom>
                        {numeral(amount).format()} USD
                      </Typography>
                    </div>
                    <div>
                      <Slider
                        value={amount}
                        min={100}
                        max={1000}
                        step={50}
                        onChange={this.handleChangeAmount}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        color="primary"
                        variant="contained"
                        className={classes.actionButtom}
                      >
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(InvestmentsClient));
