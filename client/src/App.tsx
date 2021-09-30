import React, { Component } from 'react';
import './App.css';

import AppRouter from './components/AppRouter/AppRouter';
import axios from 'axios';
import { TOKEN_API_ENPOINT } from './api/API';

class App extends Component {
  componentDidMount() {
    axios.get(`${TOKEN_API_ENPOINT}/hello`);
  }
  render() {
    return (
      <div className="container-fluid">
        <AppRouter />
      </div>
    );
  }
}

export default App;
