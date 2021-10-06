import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import LogInContainer from './containers/LogInContainer.jsx';

// use React Router to render LogInContainer or MainContainer depending on path 
export default function App(props) {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <LogInContainer />
        </Route>
        <Route path="/home">
          <MainContainer />
        </Route>
      </Switch>
    </div>
  );
}