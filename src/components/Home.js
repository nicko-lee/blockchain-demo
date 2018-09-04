import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sha256 } from '../utils/helpers';

class Home extends Component {
    static propTypes = {
        // authedUser: PropTypes.string.isRequired,
      };

    state = {
        ledgerPayload: '',
        token: '',
        sha256Output: ''
    };

    componentDidMount = () => {
        console.log(sha256('abc'));
    }

    handleClick = () => {
        console.log('I ran');
    }

    handleChangeInLedgerPayload = (event) => {
        this.setState({ ledgerPayload: event.target.value });
        this.setState( {sha256Output: sha256(this.state.ledgerPayload)} )
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Blockchain Demo</h2>
                    <h5 className="text-muted">An interactive simplified example of how blockchain works...</h5>
                </div>
                    <div style={styles.formContainer}>
                        <form>
                            <span>Ledger Payload:</span><br />
                            <textarea 
                                type="text" 
                                placeholder="Enter ledger payload (any string)..."
                                value={this.state.ledgerPayload}
                                onChange={ this.handleChangeInLedgerPayload }
                                style={styles.inputBox}   
                            /> <br />
                            <span>Token Value:</span><br />
                            <textarea 
                                type="text" 
                                placeholder="Token Value"
                                value={this.state.token}
                                onChange={ (event) => this.setState({ token: event.target.value })} 
                                style={styles.inputBox} 
                            /> <br />

                            <span style={styles.labelText}>SHA256 Hash of your string::</span><br />
                            <textarea readOnly
                                type="text" 
                                placeholder="SHA256 algorithm will always output a 64 character string"
                                value={this.state.sha256Output}
                                style={styles.inputBox}   
                            /> <br />

                            <p>
                                <button type="button" className="btn btn-primary btn-sm" onClick={this.handleClick}> 
                                    Start Mining!
                                </button>
                            </p>
                            {/* {this.state.validationMsg ===true && <p>Please enter both options</p> } */}
                        </form>
                    </div>
            </div>
        );
    }

}

const styles = {
    inputBox: {
    //   borderColor: 'red',
    //   backgroundColor: 'powderblue',
      padding: '10px',
      marginTop: '10px',
      marginBottom: '20px',
      width: '30%',
      height: '100px'
    },
    labelText: {
      fontSize: '1rem',
      marginTop: '15px', 
    //   fontWeight: 'bold'
    },
    formContainer: {
      backgroundColor: 'pink'
    }
  };

export default Home;
