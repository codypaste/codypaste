import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "state/store";
import { EditorView } from "screens/editor-view/EditorView";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/new" component={EditorView} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
