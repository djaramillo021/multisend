Dependencies
- node
- Node Version Manager
- Ganache

Install
```
nvm i
npm install -g truffle
npm install -g ganache-cli
```


Test
```
truffle --network ganache test
```

Publish(Rospten)
```
truffle --network ropsten  migrate --reset
```

Publish(Mainnet)
```
truffle --network mainnet  migrate --reset
```

*You need to set  truffle-config.js to use the mainnet and rospten networks

