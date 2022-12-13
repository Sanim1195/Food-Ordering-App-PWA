import { useState } from 'react';
import HomePage from './HomePage';
// import SignUp from './components/Layout/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './store/auth-context';
import Resturant from './components/Layout/Resturant';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}>
        </Route>
        <Route path="/orders" component={Resturant}/>
      </Switch>
    </Router >
    </AuthProvider>
  );
}

export default App;
