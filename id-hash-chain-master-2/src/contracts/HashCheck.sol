pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract HashCheck is Ownable {

  struct Document {
    string docType;
    bool signed;
    uint256 expires;
  }

  mapping (uint256 => mapping (bytes32 => Document)) public documents;
  mapping(uint256 => bool) public validatedUsers;

  function isValid(Document _document) internal view returns (bool) {
    return _document.signed && _document.expires > now;
  }

  function isExpired(uint256 _user, bytes32 _hash) public view returns (bool) {
    return documents[_user][_hash].expires > now;
  }

  function validHash(uint256 _user, bytes32 _hash) public view returns (bool) {
    return isValid(documents[_user][_hash]);
  }

  function addDocument(uint256 _user, bytes32 _hash, string _docType, uint256 _expires) public onlyOwner returns (bool) {
    documents[_user][_hash] = Document({docType: _docType,
                                        expires: _expires,
                                        signed: true});
    return true;
  }

  function validateUser(uint256 _user) public onlyOwner returns (bool) {
    validatedUsers[_user] = true;
    return true;
  }

  function isValid(uint256 _user) public view returns (bool) {
    return validatedUsers[_user];
  }

  function invalidateUser(uint256 _user) public onlyOwner returns (bool) {
    validatedUsers[_user] = false;
    return true;
  }

}
