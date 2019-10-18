const { BN, balance, ether, should, shouldFail, time, expectEvent } = require('openzeppelin-test-helpers');

const MultisendBase = artifacts.require('MultisendBase2');
require('chai')
  .use(require('chai-bn')(BN))
  .should();





contract('MultisendBase2', accounts => {

  const _admin=accounts[0];
  const _ethFee=accounts[1];
  const _dest=accounts[2];
  const _user=accounts[3];
  

  beforeEach(async function () { 
    this._mutisend = await MultisendBase.new({ from: _admin });
    console.log(`MultisendBase2: ${this._mutisend.address}`)
  


  });

  describe('MultisendBase2', function() {



    it('should split money', async function() {
        const _desAmount= new BN("200000");
        const _feedAmount= new BN("300000");
        const _total= new BN("500000");
        

        const prebalanceDest = await web3.eth.getBalance(_dest)
        const prebalanceUser = await web3.eth.getBalance(_user)
        const prebalanceEthFee = await web3.eth.getBalance(_ethFee)
        
        await this._mutisend.bulkSendEth(_dest,_ethFee,_desAmount,_feedAmount ,{ from: _user, value:_total });
  
        const postbalanceUser = await web3.eth.getBalance(_user)
        const postbalanceDest = await web3.eth.getBalance(_dest)
        const postbalanceEthFee = await web3.eth.getBalance(_ethFee)


        console.log("prebalanceDest:"+prebalanceDest)
        console.log("postbalanceDest:"+postbalanceDest)


        console.log("prebalanceUser:"+prebalanceUser)
        console.log("postbalanceUser:"+postbalanceUser)


        console.log("prebalanceEthFee:"+prebalanceEthFee)
        console.log("postbalanceEthFee:"+ postbalanceEthFee)


    });


  });


});