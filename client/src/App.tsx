import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import AppRouter from './components/AppRouter/AppRouter';
import GlobalErrorHandler from './components/ErrorHandler/GlobalErrorHandler';
import axios from 'axios';
import { TOKEN_API_ENPOINT } from './api/API';

class App extends Component {
  componentDidMount() {
    axios.get(`${TOKEN_API_ENPOINT}/hello`);
  }
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <GlobalErrorHandler>
          <AppRouter />
        </GlobalErrorHandler>
      </div>
    );
  }
}

export default App;
