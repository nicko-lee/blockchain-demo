import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import GenesisBlock from './components/GenesisBlock';
import SubsequentBlock from './components/SubsequentBlock';
import Tester from './components/Tester';
import { connect } from 'react-redux';
import { _getBlocks, _getGenesisBlock } from './utils/_DATA';
import { saveBlocksToStore, saveGenesisBlockToStore } from './actions/root';

class App extends Component {
  
  componentDidMount = () => {
    _getBlocks()
    .then(res => {  
      this.props.saveBlocksToStore(res);
    }
  );

    _getGenesisBlock()
    .then(res => {
      this.props.saveGenesisBlockToStore(res);
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Interactive Blockchain Demo</h1>
        </header>
        <div>
          <h2>Real-time SHA256 Hashing</h2>
          <p className="text-muted">An interactive simplified example of how blockchain works...</p>
        </div>
        <div style={styles.blockchainContainer}>
          <GenesisBlock isGenesisBlock={true} blockName={"Genesis Block"}/>
          {/* <SubsequentBlock blockName={"Block #1"}/>
          <SubsequentBlock blockName={"Block #2"}/> */}
        </div>
          <Tester />
      </div>
    );
  }
}

const styles = {
    blockchainContainer: {
    //   borderColor: 'red',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      margin: '20px',
      backgroundColor: 'powderblue',
      // padding: '10px',
      // marginTop: '10px',
      // marginBottom: '20px',
      // width: '30%',
      // height: '100px'
    },
  };


function mapStateToProps (state) {
  return {
    genesisBlock: state.genesisBlock,
    subsequentBlocks: state.subsequentBlocks
  }
}

const mapDispatchToProps = dispatch => ({
  saveBlocksToStore: (blocks) => dispatch(saveBlocksToStore(blocks)),
  saveGenesisBlockToStore: (block) => dispatch(saveGenesisBlockToStore(block))
}) 

export default connect(mapStateToProps, mapDispatchToProps)(App)