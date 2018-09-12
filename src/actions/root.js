// ACTION TYPES
export const CHANGE_PAYLOAD_GENESIS = "CHANGE_PAYLOAD_GENESIS";
export const CHANGE_TOKEN_GENESIS = "CHANGE_TOKEN_GENESIS";
export const CHANGE_HASH_GENESIS = "CHANGE_HASH_GENESIS";
export const CHANGE_PAYLOAD = "CHANGE_PAYLOAD";
export const CHANGE_TOKEN = "CHANGE_TOKEN";
export const CHANGE_HASH = "CHANGE_HASH";
export const SET_PREVIOUS_HASH = "SET_PREVIOUS_HASH";
export const GET_BLOCKS = "GET_BLOCKS";
export const GET_GENESIS_BLOCK = "GET_GENESIS_BLOCK";



// ACTION CREATORS

export const changePayloadGenesis = (payload) => ({
    type: CHANGE_PAYLOAD_GENESIS,
    value: payload
})

export const changeTokenGenesis = (token) => ({
    type: CHANGE_TOKEN_GENESIS,
    value: token
})

export const changeHashGenesis = (hash) => ({
    type: CHANGE_HASH_GENESIS,
    value: hash
})

export const changePayload = (id, payload) => ({
    type: CHANGE_PAYLOAD,
    value: { id, payload }
})

export const changeToken = (id, token) => ({
    type: CHANGE_TOKEN,
    value: { id, token }
})

export const changeHash = (id, hash) => ({
    type: CHANGE_HASH,
    value: { id, hash }
})

export const setPreviousHash = (id, hash) => ({
    type: SET_PREVIOUS_HASH,
    value: { id, hash }
})

// though it's saving all blocks it is just only one JS object
export const saveBlocksToStore = (blocks) => ({
    type: GET_BLOCKS,
    value: blocks
})

// though it's saving all blocks it is just only one JS object
export const saveGenesisBlockToStore = (block) => ({
    type: GET_GENESIS_BLOCK,
    value: block
})




