const { BN, balance, ether, should, shouldFail, time, expectEvent } = require('openzeppelin-test-helpers');

const MultisendBase = artifacts.require('MultisendBase');
require('chai')
  .use(require('chai-bn')(BN))
  .should();





contract('MultisendBase', accounts => {

  const _admin=accounts[0];
  const _ethFee=accounts[1];
  const _dest=accounts[2];
  const _user=accounts[3];
  

  beforeEach(async function () { 
    this._mutisend = await MultisendBase.new({ from: _admin });
    console.log(`MultisendBase: ${this._mutisend.address}`)
  
    this._mutisend.setEthFeeAddress(_ethFee,{ from: _admin });

  });

  describe('MultisendBase', function() {



    it('should split money', async function() {
        const _desAmount= new BN("200000");
        const _feedAmount= new BN("500000");
        const _amount= new BN("700000");
        

        const prebalanceDest = await web3.eth.getBalance(_dest)
        const prebalanceUser = await web3.eth.getBalance(_user)
        const prebalanceEthFee = await web3.eth.getBalance(_ethFee)
        

        const  logsSend = await this._mutisend.bulkSendEth(_dest, _desAmount,_feedAmount,{ value: _amount, from: _user });

        const postbalanceUser = await web3.eth.getBalance(_user)
        const postbalanceDest = await web3.eth.getBalance(_dest)
        const postbalanceEthFee = await web3.eth.getBalance(_ethFee)


        console.log("prebalanceDest:"+prebalanceDest)
        console.log("postbalanceDest:"+postbalanceDest)


        console.log("prebalanceUser:"+prebalanceUser)
        console.log("postbalanceUser:"+postbalanceUser)


        console.log("prebalanceEthFee:"+prebalanceEthFee)
        console.log("postbalanceEthFee:"+ postbalanceEthFee)


        const eventSend = logsSend.logs.find(e => e.event === 'BulkSendEth');
        eventSend.args.source.should.equal(_user);
        eventSend.args.dest.should.equal(_dest);
        eventSend.args.amount.should.be.a.bignumber.that.equals(_desAmount);
        eventSend.args.feedAmount.should.be.a.bignumber.that.equals(_feedAmount);
    });


  });


});