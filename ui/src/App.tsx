import React from "react";
import { Provider } from "react-redux";
import { store } from "state/store";

function App() {
  return (
    <Provider store={store}>
      <div>Hello!</div>
    </Provider>
  );
}

export default App;
