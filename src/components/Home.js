import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Home extends Component {
    static propTypes = {
        // authedUser: PropTypes.string.isRequired,
      };

    state = {
        ledgerPayload: '',
        token: '',
        sha256Output: ''
    };

    handleClick = () => {
        console.log('I ran')
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Blockchain Demo</h2>
                    <h5 className="text-muted">An interactive simplified example of how blockchain works...</h5>
                </div>
                    <div>
                        <form>
                            <span>Ledger Payload:</span><br />
                            <input 
                                type="text" 
                                placeholder="Enter ledger payload (any string)..."
                                value={this.state.ledgerPayload}
                                onChange={ (event) => this.setState({ ledgerPayload: event.target.value })}
                                // style={this.inputStyle}   
                            /> <br />
                            <span>Token:</span><br />
                            <input 
                                type="text" 
                                placeholder="Token"
                                value={this.state.token}
                                onChange={ (event) => this.setState({ token: event.target.value })} 
                                style={styles.root} 
                            />
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
    root: {
      borderColor: 'red',
      backgroundColor: 'powderblue',
      padding: '10px',
    },
    text: {
      fontSize: '1rem',
      fontWeight: 'bold'
    }
  };

export default Home;
