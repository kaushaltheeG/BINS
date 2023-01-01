import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CreateNewPage from './components/CreateNewPage';
import SigninFormPage from './components/SigninFormPage';
import TopNavigation from './components/TopNavigation';
import WorkAreaSelectionPage from './components/WorkAreaSelectionPage';
import DisplayWorkAreaPage from './components/DisplayWorkAreaPage';

function App() {
  // const user = useSelector(state => Object.values(state.session))
  return (
    <>
      <TopNavigation />
      <Switch>
        <Route path='/' exact>  
          {/* <h2>Welcome to BINS: Sign In or Sign Up</h2> */}
        </Route>
        <Route path={`/client/workareas/:workareaId/pods/:podId`} extact>
          <DisplayWorkAreaPage />
        </Route>
        <Route path='/client/workareas' extact>
          <WorkAreaSelectionPage />
        </Route>
        <Route path="/signin">
          <SigninFormPage />
        </Route>
        <Route path="/createnew">
          <CreateNewPage />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </>
  );
}

export default App;
