pragma solidity ^0.5.10;


import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/roles/WhitelistAdminRole.sol";



contract Multisend is WhitelistAdminRole {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address payable public etherFeed;
    address public tokenFeed;

    uint256 public ethSendFeeNumerator;
    uint256 public ethSendFeeDenominator;

    uint256 public tokenSendFeeNumerator;
    uint256 public tokenSendFeeDenominator;





    constructor()
    WhitelistAdminRole()
    public
    {
        etherFeed = msg.sender;
        tokenFeed = msg.sender;
        ethSendFeeNumerator = 22;
        ethSendFeeDenominator = 100;
        tokenSendFeeNumerator = 22;
        tokenSendFeeDenominator = 100;
    }


    event BulkSendEth(address indexed source, address indexed dest, uint256 amount);
    event BulkSendToken(address indexed source, address dest,uint256 amount,address token);

    function percent( uint256 amount, uint256 numerator, uint256 denominator) public pure returns(uint256 pamount) {

                // caution, check safe-to-multiply here
                uint256 _preamount = amount.mul(numerator);
                // with rounding of last digit
                uint256 _pamount = _preamount.div(denominator);
                return  _pamount;
    }

    function bulkSendEth(address payable dest) public payable {

        uint256 _pamount = percent(msg.value,ethSendFeeNumerator,ethSendFeeDenominator);
        uint256 _destAmount = msg.value.sub(_pamount);
        require(_destAmount > 0, "destAmount must be positive");
        require(_pamount > 0, "_pamount must be positive");

        dest.transfer(_destAmount * 1 wei);
        etherFeed.transfer(_pamount * 1 wei);
        emit BulkSendEth(msg.sender,dest,_destAmount);
    }

    function bulkSendToken(IERC20 tokenAddr, address dest, uint256 amount) public {
        address multisendContractAddress = address(this);
        require(amount <= tokenAddr.allowance(msg.sender, multisendContractAddress),"multisendContractAddress has not allow");
        uint256 _pamount = percent(amount,tokenSendFeeNumerator, tokenSendFeeDenominator);
        uint256 _destAmount = amount.sub(_pamount);
        require(_destAmount > 0, "destAmount must be positive");
        require(_pamount > 0, "_pamount must be positive");

        tokenAddr.transferFrom(msg.sender, dest, _destAmount);
        tokenAddr.transferFrom(msg.sender, tokenFeed, _pamount);
        emit BulkSendToken(msg.sender,dest,_destAmount,address(tokenAddr));
    }




    function setTokenFee(uint256 _tokenSendFeeNumerator,uint256 _tokenSendFeeDenominator) public onlyWhitelistAdmin{
        require(_tokenSendFeeNumerator > 0, "_tokenSendFeeNumerator must be positive");
        require(_tokenSendFeeDenominator > 0, "_tokenSendFeeDenominator must be positive");
        tokenSendFeeNumerator = _tokenSendFeeNumerator;
        tokenSendFeeDenominator = _tokenSendFeeDenominator;
    }


    function setEthFee(uint256 _ethSendFeeNumerator, uint256 _ethSendFeeDenominator) public onlyWhitelistAdmin {
        require(_ethSendFeeNumerator > 0, "_ethSendFeeNumerator must be positive");
        require(_ethSendFeeDenominator > 0, "_ethSendFeeDenominator must be positive");
        ethSendFeeNumerator = _ethSendFeeNumerator;
        ethSendFeeDenominator = _ethSendFeeDenominator;
    }

    function setTokenFeeAddress(address _tokenFeed) public onlyWhitelistAdmin{
        tokenFeed = _tokenFeed;
    }

    function setEthFeeAddress(address payable _etherFeed) public onlyWhitelistAdmin {
        etherFeed = _etherFeed;
    }

    function destroy (address payable _to) public onlyWhitelistAdmin {
        selfdestruct(_to);
    }
}

