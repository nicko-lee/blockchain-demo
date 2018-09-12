import {
    CHANGE_PAYLOAD_GENESIS,
    CHANGE_TOKEN_GENESIS,
    CHANGE_HASH_GENESIS,
    CHANGE_PAYLOAD,
    CHANGE_TOKEN,
    SET_PREVIOUS_HASH,
    CHANGE_HASH,
    GET_BLOCKS,
    GET_GENESIS_BLOCK
} from '../actions/root';
import { combineReducers } from 'redux';

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
            return { ...state, [state.payload]: value };
        case CHANGE_TOKEN_GENESIS:
            return { ...state, [state.token]: value };
        case CHANGE_HASH_GENESIS:
            return { ...state, [state.hash]: value };
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
        case SET_PREVIOUS_HASH:
            return { ...state, [state.previoushash]: value.hash };
        default:   
            return state;
    }
};


// ALL COMES TOGETHER HERE - THIS IS YOUR "STORE"
export default combineReducers({
    genesisBlock: genesisReducer,
    subsequentBlocks: blockReducer
});