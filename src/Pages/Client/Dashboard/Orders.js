import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 209,
  },
  tabs: {
    paddingTop: 25,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  title: {
    padding: `0`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
      >
        History
      </Typography>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="LTZ" {...a11yProps(0)} />
        <Tab label="BTC" {...a11yProps(1)} />
        <Tab label="ETH" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        LTZ
      </TabPanel>
      <TabPanel value={value} index={1}>
        BTC
      </TabPanel>
      <TabPanel value={value} index={2}>
        ETH
      </TabPanel>
    </div>
  );
}
