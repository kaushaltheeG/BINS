import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateNewPage from './components/CreateNewPage';
import SigninFormPage from './components/SigninFormPage';

function App() {
  // const user = useSelector(state => Object.values(state.session))
  return (
    <Switch>
      <Route path='/' exact>
        <h2>Hello User!</h2>
      </Route>
      <Route path="/signin">
        <SigninFormPage />
      </Route>
      <Route path="/createnew">
        <CreateNewPage />
      </Route>
    </Switch>
  );
}

export default App;
