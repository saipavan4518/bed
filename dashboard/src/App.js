import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';


//IMPORTS
import Panel from './components/Panel.component';
import NotFound from './components/NotFound.component.js';
import Dashboard from './components/Dashboard.component.js';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/admin/panel" component={Panel}/>
        <Route path="/dashboard/admin/hospital" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
