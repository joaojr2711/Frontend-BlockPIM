import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DoneIcon from "@material-ui/icons/Done";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

import Topbar from "../Header/index";

const logo = require("../../../assets/logo.svg");

const numeral = require("numeral");
numeral.defaultFormat("0");

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary["A100"],
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
  grid: {
    margin: `0 ${theme.spacing(2)}px`
  },
  smallContainer: {
    width: "60%"
  },
  bigContainer: {
    width: "80%"
  },
  logo: {
    marginBottom: 24,
    display: "flex",
    justifyContent: "center"
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stepGrid: {
    width: "80%"
  },
  buttonBar: {
    marginTop: 32,
    display: "flex",
    justifyContent: "center"
  },
  button: {
    backgroundColor: theme.palette.primary["A100"]
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  stepper: {
    backgroundColor: "transparent"
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  topInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formControl: {
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
});

const getSteps = () => {
  return ["User", "Signin", "Permission"];
};

class PaymentsClient extends Component {
  state = {
    activeStep: 0,
    receivingAccount: "",
    termsChecked: false,
    loading: true,
    labelWidth: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
    if (this.state.activeStep === 2) {
      setTimeout(() => this.props.history.push("/History"), 5000);
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTerms = event => {
    this.setState({ termsChecked: event.target.checked });
  };

  stepActions() {
    if (this.state.activeStep === 0) {
      return "Sign in";
    }
    if (this.state.activeStep === 1) {
      return "Next";
    }
    if (this.state.activeStep === 2) {
      return "Accept";
    }
    return "Next";
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, loading } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              spacing={10}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid item xs={12}>
                <div className={classes.stepContainer}>
                  <div className={classes.stepGrid}>
                    <Stepper
                      classes={{ root: classes.stepper }}
                      activeStep={activeStep}
                      alternativeLabel
                    >
                      {steps.map(label => {
                        return (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </div>
                  {activeStep === 0 && (
                    <div className={classes.smallContainer}>
                      <Paper className={classes.paper}>
                        <div>
                          <div style={{ marginBottom: 32 }}>
                            <Typography
                              variant="subtitle1"
                              style={{ fontWeight: "bold" }}
                              gutterBottom
                            >
                              Selecione o valor
                            </Typography>
                          </div>
                            <FormControl
                              variant="outlined"
                              className={classes.formControl}
                            >
                              <Select
                                value={this.state.receivingAccount}
                                onChange={this.handleChange}
                                input={
                                  <OutlinedInput
                                    labelWidth={this.state.labelWidth}
                                    name="receivingAccount"
                                  />
                                }
                              >
                                <MenuItem value={"50"}>R$ 50,00</MenuItem>
                                <MenuItem value={"100"}>R$ 100,00</MenuItem>
                              </Select>
                            </FormControl>
                          <div>
                            <Typography
                              style={{
                                textTransform: "uppercase",
                                marginBottom: 20,
                                paddingTop: "10px"
                              }}
                              color="secondary"
                              gutterBottom
                            >
                              Dados do cartão
                            </Typography>
                            <Grid container>
                              <FormControl
                                variant="outlined"
                                labelWidth={this.state.labelWidth}
                                className={classes.formControl}
                              >
                                <div style={{ paddingTop: "10px" }}>

                                  <TextField id="outlined-basic" label="Nome completo" variant="outlined" />

                                  <TextField style={{ left: "5px" }} id="outlined-basic" label="CPF" variant="outlined" />
                                </div>
                                <div style={{ paddingTop: "10px" }}>
                                  <TextField id="outlined-basic" label="E-mail" variant="outlined" />

                                  <TextField style={{ left: "5px" }} id="outlined-basic" label="Senha" variant="outlined" />
                                </div>
                                <div style={{ paddingTop: "10px" }}>
                                  <TextField id="outlined-basic" label="Número do cartão" variant="outlined" />

                                  <TextField style={{ left: "5px" }} id="outlined-basic" label="Data de Válidade" variant="outlined" />

                                  <TextField style={{ left: "10px" }} id="outlined-basic" label="Código de segurança" variant="outlined" />
                                </div>
                              </FormControl>
                            </Grid>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div className={classes.smallContainer}>
                      <Paper className={classes.paper}>
                        <Grid item container xs={12}>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                              confirm
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              detils payment
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className={classes.smallContainer}>
                      <Paper className={classes.paper}>
                        <div>
                          <div style={{ marginBottom: 32 }}>
                            <Typography variant="subtitle1" gutterBottom>
                              Permissions
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              We need some permissions to proceed.
                            </Typography>
                          </div>
                          <div>
                            <Typography color="secondary" gutterBottom>
                              Accounts
                            </Typography>
                            <List component="nav">
                              <ListItem>
                                <ListItemIcon>
                                  <DoneIcon />
                                </ListItemIcon>
                                <ListItemText
                                  inset
                                  primary="0297 00988200918"
                                />
                              </ListItem>
                            </List>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  )}
                  {activeStep === 3 && (
                    <div className={classes.bigContainer}>
                      <Paper className={classes.paper}>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <div style={{ width: 380, textAlign: "center" }}>
                            <div style={{ marginBottom: 32 }}>
                              <Typography
                                variant="h6"
                                style={{ fontWeight: "bold" }}
                                gutterBottom
                              >
                                Collecting your data
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                We are processing your request
                              </Typography>
                            </div>
                            <div>
                              <Fade
                                in={loading}
                                style={{
                                  transitionDelay: loading ? "800ms" : "0ms"
                                }}
                                unmountOnExit
                              >
                                <CircularProgress
                                  style={{
                                    marginBottom: 32,
                                    width: 100,
                                    height: 100
                                  }}
                                />
                              </Fade>
                            </div>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  )}
                  {activeStep !== 3 && (
                    <div className={classes.buttonBar}>
                      {activeStep !== 2 ? (
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.backButton}
                          size="large"
                        >
                          Back
                        </Button>
                      ) : (
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.backButton}
                            size="large"
                          >
                            Cancel
                          </Button>
                        )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        size="large"
                        style={
                          this.state.receivingAccount.length
                            ? { background: classes.button, color: "white" }
                            : {}
                        }
                        disabled={!this.state.receivingAccount.length}
                      >
                        {this.stepActions()}
                      </Button>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(PaymentsClient));
