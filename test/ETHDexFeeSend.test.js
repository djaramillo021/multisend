const { BN, balance, ether, should, shouldFail, time, expectEvent } = require('openzeppelin-test-helpers');
const truffleAssert = require('truffle-assertions');

const ETHDexFeeSend = artifacts.require('ETHDexFeeSend');
require('chai')
  .use(require('chai-bn')(BN))
  .should();





contract('ETHDexFeeSend', accounts => {

  const _admin=accounts[0];
  const _ethFee=accounts[1];
  const _dest=accounts[2];
  const _user=accounts[3];
  

  beforeEach(async function () { 
    this._mutisend = await ETHDexFeeSend.new({ from: _admin });
    console.log(`ETHDexFeeSend: ${this._mutisend.address}`)
  


  });

  describe('ETHDexFeeSend', function() {



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


        const destBalance=new BN(prebalanceDest).add(_desAmount);
        new BN(postbalanceDest).should.be.a.bignumber.that.equals(`${destBalance}`);

        const feeBalance=new BN(prebalanceEthFee).add(_feedAmount);
        new BN(postbalanceEthFee).should.be.a.bignumber.that.equals(`${feeBalance}`);

        console.log("prebalanceDest:"+prebalanceDest)
        console.log("postbalanceDest:"+postbalanceDest)


        console.log("prebalanceUser:"+prebalanceUser)
        console.log("postbalanceUser:"+postbalanceUser)


        console.log("prebalanceEthFee:"+prebalanceEthFee)
        console.log("postbalanceEthFee:"+ postbalanceEthFee)


    });


    it('should split money, over total', async function() {
      const _desAmount= new BN("200000");
      const _feedAmount= new BN("300000");
      const _total= new BN("600000");
      

      const prebalanceDest = await web3.eth.getBalance(_dest)
      const prebalanceUser = await web3.eth.getBalance(_user)
      const prebalanceEthFee = await web3.eth.getBalance(_ethFee)
      
      await truffleAssert.reverts(this._mutisend.bulkSendEth(_dest,_ethFee,_desAmount,_feedAmount ,{ from: _user, value:_total }), "There are not enough funds");
        
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



  it('should split money, under total', async function() {
    const _desAmount= new BN("200000");
    const _feedAmount= new BN("300000");
    const _total= new BN("600000");
    

    const prebalanceDest = await web3.eth.getBalance(_dest)
    const prebalanceUser = await web3.eth.getBalance(_user)
    const prebalanceEthFee = await web3.eth.getBalance(_ethFee)
    
    await truffleAssert.reverts(this._mutisend.bulkSendEth(_dest,_ethFee,_desAmount,_feedAmount ,{ from: _user, value:_total }), "There are not enough funds");
        


    const postbalanceUser = await web3.eth.getBalance(_user)
    const postbalanceDest = await web3.eth.getBalance(_dest)
    const postbalanceEthFee = await web3.eth.getBalance(_ethFee)

    console.log()

    console.log("prebalanceDest:"+prebalanceDest)
    console.log("postbalanceDest:"+postbalanceDest)


    console.log("prebalanceUser:"+prebalanceUser)
    console.log("postbalanceUser:"+postbalanceUser)


    console.log("prebalanceEthFee:"+prebalanceEthFee)
    console.log("postbalanceEthFee:"+ postbalanceEthFee)


});


  });


});