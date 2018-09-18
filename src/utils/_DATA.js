let subsequentBlocks = {
    blockOne: {
      id: 'blockOne',
      name: 'Block #1',
      payload: 'miguel',
      token: '',
      previoushash: '',
      hash: ''
    },
    blockTwo: {
      id: 'blockTwo',
      name: 'Block #2',
      payload: 'jamie',
      token: '',
      previoushash: '',
      hash: ''
    },
    array: []
  }

  let genesisBlock = {
    genesis: {
      id: 'genesis',
      name: 'Genesis Block',
      payload: 'alfred',
      token: '',
      concatenatedString: '',
      hash: ''
    },
  }
  
  
  export function _getBlocks () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...subsequentBlocks}), 1000)
    })
  }
  
  export function _getGenesisBlock () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...genesisBlock}), 1000)
    })
  }
  

  

  
