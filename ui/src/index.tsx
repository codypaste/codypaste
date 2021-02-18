import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import "tippy.js/dist/tippy.css";
import { appStyles } from "config/styles";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const customTheme = {
  ...theme,
};

const GlobalStyle = createGlobalStyle`
html {
  font-size: 16px;
};

body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  background-color: ${appStyles.bgColor};
}
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
