import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GenesisBlock from './GenesisBlock';

class SubsequentBlock extends Component {
    static propTypes = {
        blockName: PropTypes.string.isRequired,
      };

    // basically its like creating a wrapper around GenesisBlock.js and hardcoding isGenesisBlock to false as it will always be false by defn
    render() {
        return (
            <div>
                <GenesisBlock isGenesisBlock={false} blockName={this.props.blockName}/>
            </div>

        );
    }

}

// const styles = {
//     inputBox: {
//     //   borderColor: 'red',
//     //   backgroundColor: 'powderblue',
//       padding: '10px',
//       marginTop: '10px',
//       marginBottom: '20px',
//       width: '30%',
//       height: '100px'
//     },
//     labelText: {
//       fontSize: '1rem',
//       marginTop: '15px', 
//     //   fontWeight: 'bold'
//     },
//     formContainer: {
//       backgroundColor: 'pink'
//     }
//   };

export default SubsequentBlock;
