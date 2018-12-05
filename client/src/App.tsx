import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter/AppRouter';

class App extends Component {
  render() {
    return (
      <div className ="container-fluid">
        <AppRouter/>
      </div>
    );
  }
}

export default App;
