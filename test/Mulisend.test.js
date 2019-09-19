const { BN, balance, ether, should, shouldFail, time, expectEvent } = require('openzeppelin-test-helpers');

const Multisend = artifacts.require('Multisend');
require('chai')
  .use(require('chai-bn')(BN))
  .should();





contract('Multisend', accounts => {

  const _admin=accounts[0];
  const _ethFee=accounts[1];
  const _dest=accounts[2];
  const _user=accounts[3];
  const _ethNum=new BN(22);
  const _ethDem=new BN(100);
  

  beforeEach(async function () { 
    this._mutisend = await Multisend.new({ from: _admin });
    console.log(`Multisend: ${this._mutisend.address}`)
    
    console.log(_ethNum);
    this._mutisend.setEthFee(_ethNum,_ethDem,{ from: _admin });
    this._mutisend.setEthFeeAddress(_ethFee,{ from: _admin });

  });

  describe('Multisend', function() {



    it('should split money', async function() {
        const _amount= new BN("200000");
        const  logsSend = await this._mutisend.bulkSendEth(_dest, { value: _amount, from: _user });
        const _dem = await this._mutisend.ethSendFeeDenominator();
        const _num = await this._mutisend.ethSendFeeNumerator();
        
        //_ethNum.should.be.a.bignumber.that.equals("22");
        
        const _precAmount = await  this._mutisend.percent(_amount,_num,_dem);
        console.log(_precAmount.toString() )
        
        const _destamount= 200000 - Number(_precAmount.toString());
        

        const eventSend = logsSend.logs.find(e => e.event === 'BulkSendEth');
        eventSend.args.source.should.equal(_user);
        eventSend.args.dest.should.equal(_dest);
        eventSend.args.amount.should.be.a.bignumber.that.equals(`${_destamount}`);
    });


  });


});