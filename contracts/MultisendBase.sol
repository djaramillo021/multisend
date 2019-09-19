pragma solidity ^0.5.10;


import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/roles/WhitelistAdminRole.sol";



contract MultisendBase is WhitelistAdminRole {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address payable public etherFeed;

    constructor()
    WhitelistAdminRole()
    public
    {
        etherFeed = msg.sender;
    }


    event BulkSendEth(address indexed source, address indexed dest, uint256 amount, uint256 feedAmount);

    function bulkSendEth(address payable dest,uint256 destAmount,uint256 feedAmount) public payable {

        require(dest != address(0),"address dest must exit");
        require(destAmount > 0, "destAmount must be positive");
        require(feedAmount > 0, "_pamount must be positive");

        dest.transfer(destAmount * 1 wei);
        etherFeed.transfer(feedAmount * 1 wei);
        emit BulkSendEth(msg.sender,dest,destAmount,feedAmount);
    }


    function setEthFeeAddress(address payable _etherFeed) public onlyWhitelistAdmin {
        etherFeed = _etherFeed;
    }

    function destroy (address payable _to) public onlyWhitelistAdmin {
        selfdestruct(_to);
    }
}

