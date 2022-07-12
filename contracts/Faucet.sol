pragma solidity ^0.8.6;

contract Faucet{
    //addFund, withDraw, addressindex, getFunder
    uint256 public numOfFunders; 
    mapping(uint256 => address) public lutFunders;
    mapping(address => bool) public funders;
    receive() external payable{} //co the nhan tien

    function addFunds() external payable{
        address funder = msg.sender;
        if (!funders[funder]){
            funders[funder] =true;
            lutFunders[numOfFunders++] = funder;
        }
    }

    function  getFunderIndex(uint256 index) external view returns(address) {
        return lutFunders[index];
    }

    function getAllFunders() external view returns(address[] memory){
        address[] memory _funders = new address[](numOfFunders);
        for (uint256 i = 0;i<numOfFunders;i++){
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }

    function withdraw(uint256 amount) external limitWithdraw(amount){
        payable(msg.sender).transfer(amount);
    }

    modifier limitWithdraw(uint256 amount) {
        require(amount <= (10**18),"Cannot Withdraw more than 1ETH");
        _;
    }
}

