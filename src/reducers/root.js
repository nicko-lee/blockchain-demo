import {
    CHANGE_PAYLOAD_GENESIS,
    CHANGE_TOKEN_GENESIS,
    CHANGE_HASH_GENESIS,
    CHANGE_PAYLOAD,
    CHANGE_TOKEN,
    CREATE_SUBSEQUENT_BLOCK,
    CHANGE_HASH,
    GET_BLOCKS,
    GET_GENESIS_BLOCK
} from '../actions/root';
import { combineReducers } from 'redux';
import { sha256 } from '../utils/helpers';

// REDUCERS

// genesisBlockReducer - can only have one
// storing payload, token, SHA256 hash

// subsequentBlockReducer - can have multiple
// storing payload, token, SHA256 hash + previous hash

// maybe just use an array of blocks?

export const genesisReducer = (state = "", { type, value }) => {
    switch(type) {
        case GET_GENESIS_BLOCK:
            return value;
        case CHANGE_PAYLOAD_GENESIS:
            return { 
                ...state,
                ["genesis"]: {
                    ...state.genesis,
                    ["payload"]: value,
                    ["concatenatedString"]: value + state.genesis.token,
                    ["hash"]: sha256(value + state.genesis.token)
                }
            };
        case CHANGE_TOKEN_GENESIS:
            return { 
                ...state,
                ["genesis"]: {
                    ...state.genesis,
                    ["token"]: value,
                    ["concatenatedString"]: state.genesis.payload + value,
                    ["hash"]: sha256(state.genesis.payload + value)
                } 
            };
        case CHANGE_HASH_GENESIS:
            return { 
                ...state,
                ["genesis"]: {
                    ...state.genesis,
                    ["hash"]: value
                } 
            };
        default:   
            return state;
    }
};

export const blockReducer = (state = "", { type, value }) => {
    switch(type) {
        case GET_BLOCKS:
            return value;
        case CHANGE_PAYLOAD:
            return { ...state, [state.payload]: value.payload };
        case CHANGE_TOKEN:
            return { ...state, [state.token]: value.token };
        case CHANGE_HASH:
            return { ...state, [state.hash]: value.hash };
        case CREATE_SUBSEQUENT_BLOCK: 
            console.log("Inside CREATE_SUBSEQUENT_BLOCK reducer: I ran!")
            return { ...state, array: [
                        ...state.array,
                        value
                        ]
          };
        default:   
            return state;
    }
};


// ALL COMES TOGETHER HERE - THIS IS YOUR "STORE"
export default combineReducers({
    genesisBlock: genesisReducer,
    subsequentBlocks: blockReducer
});