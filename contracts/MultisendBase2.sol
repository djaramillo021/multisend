pragma solidity ^0.5.10;


import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";





contract MultisendBase2 {
    using SafeMath for uint256;







    event BulkSendEth(address indexed source, address indexed dest,address etherFee, uint256 amount, uint256 feeAmount);

    function bulkSendEth(address payable dest,address payable etherFee,uint256 destAmount,uint256 feeAmount) public payable {

        require(dest != address(0),"address dest must exit");
        require(destAmount > 0, "destAmount must be positive");
        require(feeAmount > 0, "_pamount must be positive");

        dest.transfer(destAmount * 1 wei);
        etherFee.transfer(feeAmount * 1 wei);
        emit BulkSendEth(msg.sender,dest,etherFee,destAmount,feeAmount);
    }





}

