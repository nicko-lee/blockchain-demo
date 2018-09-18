import React, { Component, Fragment } from 'react'
import Loading from 'react-loading-spinner';
import Spinner from './Spinner';
import { createSubsequentBlock } from '../actions/root';
import { connect } from 'react-redux';


class Tester extends Component {

    state = {
        token: 0,
        hash: 0,
        loading: false

    }

    guessToken = () => {
        let i;
        let whileLoopCounter = 0; 

        let a = performance.now();

        for (i=0; i<1000000; i++) { 
            // alert(i);
            this.setState({
                token: i,
                hash: 2 * i,
            })
            whileLoopCounter = whileLoopCounter + 1; 
        }
        this.setState({ loading: false });
        let b = performance.now();
        alert('It took ' + (b - a) + ' ms to perform ' + whileLoopCounter.toLocaleString() + ' attempts to guess the token');
    }

    handleClick = () => {
        this.setState({ loading: true});
        this.guessToken();
 
    }

    handleReduxClick = () => {
        this.props.createSubsequentBlock("abc");
 
    }

    content = () => {
        return(
        <Fragment>
            <p>Token: {this.state.token} </p>
            <p>Hash: {this.state.hash} </p>
            <button 
                type="button" 
                onClick={this.handleClick}> 
                Start Mining!
            </button>
            <button 
                type="button" 
                onClick={this.handleReduxClick}> 
                Test Redux!
            </button>
        </Fragment>
        )
    }


    render() {
        return (
            <div>
                <Loading isLoading={this.state.loading} children={this.content()} spinner={Spinner} />
            </div>

        );
    }
}

// export default Tester;

function mapStateToProps (state) {
    return {
      genesisBlock: state.genesisBlock,
      subsequentBlocks: state.subsequentBlocks
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    createSubsequentBlock: (data) => dispatch(createSubsequentBlock(data))
  }) 
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tester)
