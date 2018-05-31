import { default as Web3} from 'web3';

import { default as contract } from 'truffle-contract'

console.log(__dirname);
import HashCheckContract from '../build/contracts/HashCheck.json'

// needs to get env
var web3 = new Web3(new Web3.providers.HttpProvider("http://devnet:8545"));
var HashCheck = contract(HashCheckContract);
HashCheck.setProvider(web3.currentProvider);
fixTruffleContractCompatibilityIssue(HashCheck);

// Workaround for a compatibility issue between web3@1.0.0-beta.29 and truffle-contract@3.0.3
// https://github.com/trufflesuite/truffle-contract/issues/57#issuecomment-331300494
function fixTruffleContractCompatibilityIssue(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function() {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
    return contract;
}

var accounts;
var account;

var setAccounts = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      console.log("There was an error fetching your accounts." + err);
      return;
    }
    
    if (accs.length == 0) {
      console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    
    accounts = accs;
    account = accounts[0]; 
  });
}

var isAddress = function(address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    // If it's all small caps or all all caps, return true
    return true;
  } else {
    // Otherwise check each case
    return isChecksumAddress(address);
  }
}

var isChecksumAddress = function(address) {
  // Check each case
  address = address.replace('0x','');
  var addressHash = sha3(address.toLowerCase());
  for (var i = 0; i < 40; i++ ) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
      return false;
    }
  }
  return true;
}

module.exports = {

  init : function() {
    setAccounts();
  },

  addDocument : function(user, hash, type, expires) {
    return HashCheck.deployed().then(function(contract) {
      return contract.addDocument(user, hash, type, expires, {from: account});
    });
  },

  valid : function(user, hash) {
    return HashCheck.deployed().then(function(contract) {
      return contract.validHash.call(user, hash, {from: account});
    });
  },

  validateUser : function(user) {
    return HashCheck.deployed().then(function(contract) {
      return contract.validateUser(user, {from: account});
    });
  },

  invalidateUser : function(user) {
    return HashCheck.deployed().then(function(contract) {
      return contract.invalidateUser(user, {from: account});
    });
  }

  validated : function(user) {
    return HashCheck.deployed().then(function(contract) {
      return contract.isValid.call(user, {from: account});
    });
  },

  isExpired : function(user, hash) {
    return HashCheck.deployed().then(function(contract) {
      return contract.isExpired.call(user, hash, {from: account});
    });
  },

}
