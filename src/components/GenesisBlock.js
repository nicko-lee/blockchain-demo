import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { sha256 } from '../utils/helpers';

class GenesisBlock extends Component {
    static propTypes = {
        isGenesisBlock: PropTypes.bool.isRequired,
        blockName: PropTypes.string.isRequired
      };

    state = {
        ledgerPayload: '',
        token: '',
        sha256Output: '',
        concatenatedString: ''
    };

    componentDidMount = () => {
        console.log(sha256('abc'));
    }

    handleClick = () => {
        console.log('I ran');
    }

    handleChangeInLedgerPayload = (event) => {
        console.log("From handleChangeInLedgerPayload: ", event.target.value)
        this.setState({ ledgerPayload: event.target.value }, () => {
            /* 
            utilising a callback function that executes right after setState is finished
            source: https://stackoverflow.com/questions/34687091/can-i-execute-a-function-after-setstate-is-finished-updating
            */
            this.concatenateStringsForSHA256Input();
        });
        /*
        some weird async behavior or something? It is using ledgerPayload's value before it has been updated in the line above
        so the way around it is I just use event.target.value which is handy cos I don't need any extra logic to handle the empty strings
        */      
        // this.setState({ sha256Output: sha256(event.target.value)});   
        
    }

    handleChangeInToken = (event) => {
        this.setState({ token: event.target.value }, () => {
            this.concatenateStringsForSHA256Input();
        });
    }

    // grabPreviousBlockHash = (event) => {

    // }

    concatenateStringsForSHA256Input = () => {
        console.log("From inside concatenateStringsForSHA256Input: I ran")
        // reset this.state.sha256Output to empty if both ledgerPayload and token are empty - cos technically if u input empty string into the sha256 algorithm u still get a result
        if (this.state.ledgerPayload === '' && this.state.token === '') {
            this.setState({ sha256Output: ''}); 
        } else {
            let concatenatedString = this.state.ledgerPayload + this.state.token;
            this.setState({
                sha256Output: sha256(concatenatedString),
                concatenatedString
            })
        }
    }

    render() {
        return (
                <div style={styles.formContainer}>
                    <form>
                        <h3>{this.props.blockName}</h3>
                        <span>Ledger Payload:</span><br />
                        <textarea 
                            type="text" 
                            placeholder="Enter ledger payload (any string)..."
                            value={this.state.ledgerPayload}
                            onChange={ this.handleChangeInLedgerPayload }
                            style={styles.inputBoxLedger}   
                        /> <br />
                        <span>Token Value:</span><br />
                        <textarea 
                            type="text" 
                            placeholder="Token Value"
                            value={this.state.token}
                            onChange={ this.handleChangeInToken } 
                            style={styles.inputBoxHash} 
                        /> <br />

                        {(!this.props.isGenesisBlock) && 
                            
                            (<Fragment> 
                                <span style={styles.labelText}>SHA256 Hash of previous block:</span><br />
                                <textarea readOnly
                                    type="text" 
                                    placeholder="SHA256 algorithm will always output a 64 character string"
                                    value={this.state.sha256Output}
                                    style={styles.inputBoxHash}   
                                /> <br />
                             </Fragment>)}

                        <span style={styles.labelText}>SHA256 Hash of your string:</span><br />
                        <textarea readOnly
                            type="text" 
                            placeholder="SHA256 algorithm will always output a 64 character string"
                            value={this.state.sha256Output}
                            style={styles.inputBoxHash}   
                        /> <br />

                        <p>
                            <button type="button" className="btn btn-primary btn-sm" onClick={this.handleClick}> 
                                Start Mining!
                            </button>
                        </p>
                        {/* {this.state.validationMsg ===true && <p>Please enter both options</p> } */}
                    </form>
                </div>
        );
    }

}

const styles = {
    inputBoxLedger: {
    //   borderColor: 'red',
    //   backgroundColor: 'powderblue',
      padding: '10px',
      marginTop: '10px',
      marginBottom: '20px',
      width: '30%',
      height: '200px'
    },
    inputBoxHash: {
        padding: '10px',
        marginTop: '10px',
        marginBottom: '20px',
        width: '30%',
        height: '30px'
    },
    labelText: {
      fontSize: '1rem',
      marginTop: '15px', 
    //   fontWeight: 'bold'
    },
    formContainer: {
      backgroundColor: 'powderblue'
    }
  };

export default GenesisBlock;
