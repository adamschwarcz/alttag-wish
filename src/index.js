import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import config from "./auth_config.json";
import history from "./utils/history";

import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#61d1ff',
      main: '#00a0dd',
      dark: '#0072ab',
      contrastText: '#fff',
    },
    secondary: {
      light: '#66ff64',
      main: '#00db2e',
      dark: '#00a800',
      contrastText: '#fff',
    },
  },
});

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}>
    <MuiThemeProvider theme = { theme }>
    <App />
    </MuiThemeProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
