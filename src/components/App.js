import React, { useState } from "react";
import Landing from "./Landing";

import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import theme from "../styles/Theme";
import { DataProvider } from "../context/data.context";
import { AttributeProvider } from "../context/attribute.context";
import { HistoricalDataProvider } from "../context/historicalData.context";
import useStyles from "../styles/AppStyles";

function App() {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(false);
  const palleteType = darkState ? "dark" : "light";

  const darkTheme = createMuiTheme({
    palette: {
      type: palleteType,
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  return (
    <DataProvider>
      <AttributeProvider>
        <HistoricalDataProvider>
          <ThemeProvider theme={theme}>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <div className={classes.root}>
                <HideOnScroll>
                  <AppBar>
                    <Toolbar>
                      <Typography variant="h6">NavBar</Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={darkState}
                            onChange={handleThemeChange}
                            name="darkThemeToggle"
                          />
                        }
                        label="Dark mode"
                      />
                    </Toolbar>
                  </AppBar>
                </HideOnScroll>
                <Toolbar />
                <Container className={classes.content} maxWidth="lg">
                  <Landing />
                </Container>
                <AppBar
                  position="absolute"
                  color="primary"
                  className={classes.footer}
                >
                  <Toolbar>footer</Toolbar>
                </AppBar>
              </div>
            </ThemeProvider>
          </ThemeProvider>
        </HistoricalDataProvider>
      </AttributeProvider>
    </DataProvider>
  );
}

export default App;
