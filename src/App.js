import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import GenesisBlock from './components/GenesisBlock';
import SubsequentBlock from './components/SubsequentBlock';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Interactive Blockchain Demo</h1>
        </header>
        <div>
          <h2>Blockchain Demo</h2>
          <h5 className="text-muted">An interactive simplified example of how blockchain works...</h5>
        </div>
        <GenesisBlock isGenesisBlock={true} blockName={"Genesis Block"}/>
        <SubsequentBlock blockName={"Block #1"}/>
        <SubsequentBlock blockName={"Block #2"}/>
      </div>
    );
  }
}

export default App;
