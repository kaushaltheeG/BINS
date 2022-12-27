import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateNewPage from './components/CreateNewPage';
import SigninFormPage from './components/SigninFormPage';
import TopNavigation from './components/TopNavigation';
import WorkAreaSelectionPage from './components/WorkAreaSelectionPage';

function App() {
  // const user = useSelector(state => Object.values(state.session))
  return (
    <>
      <TopNavigation />
      <Switch>
        <Route path='/' exact>  
          {/* <h2>Welcome to BINS: Sign In or Sign Up</h2> */}
        </Route>
        <Route path='/client/workareas'>
          <WorkAreaSelectionPage />
        </Route>
        <Route path="/signin">
          <SigninFormPage />
        </Route>
        <Route path="/createnew">
          <CreateNewPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
