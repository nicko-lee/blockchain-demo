import React, { Component } from 'react';
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
    console.log("From inside App.js render(): ", this.props.subsequentBlocks)
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
          <GenesisBlock blockName={"Genesis Block"}/>


           {(this.props.subsequentBlocks.array) ?
                    this.props.subsequentBlocks.array.map( block => (
                        <SubsequentBlock blockName={block.name} previousHash={block.previousHash}/>
                    ))
           : (<div style={styles.emptyDiv}></div>)}
        </div>

          {/* <Tester /> */}
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
      // backgroundColor: 'powderblue',
      // padding: '10px',
      // marginTop: '10px',
      // marginBottom: '20px',
      // width: '30%',
      // height: '100px'
    },
    emptyDiv: {
      // backgroundColor: "blue",
      width: "10px",
      height: "10px"
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