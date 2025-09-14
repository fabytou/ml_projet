import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import ResultPage from './components/ResultPage';
import PredictionList from './components/PredictionList';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/result" component={ResultPage} />
        <Route path="/predictions" component={PredictionList} />
      </Switch>
    </Router>
  );
};

export default App;
