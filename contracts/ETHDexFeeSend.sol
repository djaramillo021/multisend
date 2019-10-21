


pragma solidity ^0.5.10;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";





library SafeTransfer {


    function safeTransfer(address payable _address,uint256 amount)  internal{
        // This forwards all available gas. Be sure to check the return value!
        (bool success, ) = _address.call.value(amount)("");
        require(success, "Transfer failed.");
    }
}


contract ETHDexFeeSend {
    using SafeTransfer for address payable;
    using SafeMath for uint256;

    function bulkSendEth(address payable dest,address payable etherFee,uint256 destAmount,uint256 feeAmount) public payable {

        require(dest != address(0),"Destination address must exist");
        require(destAmount > 0, "Destination amount must be positive");
        require(feeAmount > 0, "Fee amount must be positive");
        require(destAmount.add(feeAmount) == msg.value,"There are not enough funds");

        dest.safeTransfer(destAmount * 1 wei);
        etherFee.safeTransfer(feeAmount * 1 wei);

    }





}

