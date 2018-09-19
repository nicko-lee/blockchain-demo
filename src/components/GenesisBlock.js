import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { sha256, generateUID } from '../utils/helpers';
import { changePayloadGenesis, changeHashGenesis, changeTokenGenesis, createSubsequentBlock } from '../actions/root';
import { connect } from 'react-redux';

class GenesisBlock extends Component {
    static propTypes = {
        blockName: PropTypes.string.isRequired,
        // genesisBlock: PropTypes.object.isRequired,
        // subsequentBlocks: PropTypes.object.isRequired
      };

    state = {
        ledgerPayload: '',
        token: '',
        sha256Output: '',
        concatenatedString: '',
        showMineButton: true
    };

    componentDidMount = () => {
        console.log(sha256('abc'));
    }

    handleClickAndStartMining = () => {
        console.log('From inside handleClickAndStartMining: I ran');
        
        if (this.state.showMineButton === true) {

            // Once a block has been mined it is final. Hence I block the input forms as well as the button in the else statement below
            document.getElementById("genesisPayload").readOnly=true;
            document.getElementById("genesisToken").readOnly = true;

            // initialise token value to 0 and have a callback function to handle loop logic
            this.setState({ token: '', showMineButton: false }, () => {

                let payload = this.state.ledgerPayload;
                let token;
                let hash = sha256(payload);
                let concatenatedString; // this is because we just reset token to '' above

                // commence loop of token value - increment token value by 1 and loop until 4 trailing 0s in sha256Output
                let i = 0; // use this as the token counter and number of attempts
                let a = performance.now();

                console.log("From GenesisBlock handleClick(): ", hash.substring(0,2));

                while (hash.substring(0,4) !== "0000") {
                    token = i.toString();
                    concatenatedString = payload + token;
                    hash = sha256(concatenatedString);

                    // the following for debugging:
                    // console.log("From GenesisBlock handleClick(): ", concatenatedString);
                    // console.log("From GenesisBlock handleClick(): ", hash.substring(0,2));
                    // console.log("From GenesisBlock handleClick(): ", hash);
                    i = i + 1;
                }

                i = i - 1;
                this.setState({token: i.toString()}, () => {
                    this.concatenateStringsForSHA256Input();
                });

                let b = performance.now();
                alert('It took ' + (b - a) + ' ms to perform ' + i.toLocaleString() + ' attempts to guess the token');

                // create next block
                let name = "Block #" + (this.props.subsequentBlocks.array.length + 1);
                let nextBlock = {
                    id: generateUID(),
                    previousHash: hash,
                    name
                };
                this.props.createSubsequentBlock(nextBlock);
            });
        } else {
            // block Mining button to prevent mining again. Once a block has been mined it is final
            alert('This block has already been mined and that is FINAL! Nothing in this world can change it now...')
        }
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

        // // Redux
        // this.props.changePayloadGenesis(event.target.value);
    }

    handleChangeInToken = (event) => {
        this.setState({ token: event.target.value }, () => {
            this.concatenateStringsForSHA256Input();
        });
    }


    concatenateStringsForSHA256Input = () => {
        // console.log("From inside concatenateStringsForSHA256Input: I ran")
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

                        {(!this.state.showMineButton) && 
                            (<Fragment> 
                                <p style={styles.warningMsg}>WARNING: This block has already been mined!</p>
                            </Fragment>)}

                        <span>Ledger Payload:</span><br />
                        <textarea 
                            id="genesisPayload"
                            type="text" 
                            placeholder="Enter ledger payload (any string)..."
                            value={this.state.ledgerPayload}
                            onChange={ this.handleChangeInLedgerPayload }
                            style={styles.inputBoxLedger}   
                        /> <br />
                        <span>Token Value:</span><br />
                        <textarea 
                            id="genesisToken"
                            type="text" 
                            placeholder="Token Value"
                            value={this.state.token}
                            // value={this.updatedTokenState}
                            onChange={ this.handleChangeInToken } 
                            style={styles.inputBoxHash} 
                        /> <br />

                        <span style={styles.labelText}>SHA256 Hash of your combined string:</span><br />
                        <textarea readOnly
                            type="text" 
                            placeholder="SHA256 algorithm will always output a 64 character string"
                            value={this.state.sha256Output}
                            style={styles.inputBoxHash}   
                        /> <br />

                        <p>
                            <button id="genesisButton" type="button" style={styles.button} onClick={this.handleClickAndStartMining}> 
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
      width: '85%',
      height: '200px'
    },
    inputBoxHash: {
        padding: '10px',
        marginTop: '10px',
        marginBottom: '20px',
        width: '85%',
        height: '30px'
    },
    labelText: {
      fontSize: '1rem',
      marginTop: '15px', 
    //   fontWeight: 'bold'
    },
    formContainer: {
      backgroundColor: 'rgb(248, 249, 250)',
      width: '32%',
      borderStyle: 'solid',
      borderWidth: '1px'
    },
    button: {
        backgroundColor: "#4CAF50", /* Green OR Twitter Blue #00aced OR #1dcaff */
        border: "none",
        color: "white",
        padding: "15px 32px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        borderRadius: "6px",
        cursor: "pointer"
    },
    warningMsg: {
        backgroundColor: "red", 
        color: "white",
        fontWeight: "bold",
        padding: '5px'
    }
  };

// export default GenesisBlock;


function mapStateToProps (state) {
    return {
      genesisBlock: state.genesisBlock,
      subsequentBlocks: state.subsequentBlocks
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    changePayloadGenesis: (payload) => dispatch(changePayloadGenesis(payload)),
    changeTokenGenesis: (token) => dispatch(changeTokenGenesis(token)),
    changeHashGenesis: (hash) => dispatch(changeHashGenesis(hash)),
    createSubsequentBlock: (data) => dispatch(createSubsequentBlock(data))
  }) 
  
  export default connect(mapStateToProps, mapDispatchToProps)(GenesisBlock)