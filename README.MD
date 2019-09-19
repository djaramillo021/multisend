nvm i

npm install -g truffle

npm install -g ganache-cli



truffle --network ganache test


truffle --network ropsten test


truffle --network ganache  migrate --reset

truffle --network ropsten  migrate --reset


truffle --network ganache test /home/david.jaramillo/personal/blocksize/solidity/multisend/test/MultisendBase.test.js