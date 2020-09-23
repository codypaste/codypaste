import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const GlobalStyle = createGlobalStyle`
html {
  font-size: 16px;
};

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider>
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
