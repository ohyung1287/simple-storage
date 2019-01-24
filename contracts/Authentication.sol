pragma solidity >=0.4.22 <0.6;

//import './zeppelin/lifecycle/Killable.sol';

contract Authentication {
  struct User {
    bytes32 name;
    bytes32 password;
    bytes32 addr;
    uint phone;
  }

  mapping (uint => User) public users;

  uint public id; // Stores user id temporarily

  modifier onlyExistingUser {
    // Check if user exists or terminate

    require(!(users[id].name == 0x0));
    _;
  }

  modifier onlyValidName(bytes32 name,bytes32 password,bytes32 addr) {
    // Only valid names allowed

    require(!(name == 0x0) && !(password == 0x0) && !(addr == 0x0));
    _;
  }

  function login() view
  public
  onlyExistingUser
  returns (bytes32) {
    return (users[id].name); 
  }

  function signup(bytes32 name,bytes32 password,bytes32 addr,uint phone)public onlyValidName(name,password,addr) {
    id++;
    users[id].name = name;
    users[id].password = password;
    users[id].addr = addr;
    users[id].phone = phone;
  }
}
