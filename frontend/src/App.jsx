import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
    </Switch>
  );
}

export default App;
