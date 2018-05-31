import { keccak256 } from 'js-sha3';
var canonicalJson =  require('canonical-json');
var fs = require('fs');
var CryptoJS = require("crypto-js");

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

module.exports = {

  hashDetails : function(json) {
  return keccak256(canonicalJson(json));
  },

  hashImage : function(img) {
    return keccak256(base64_encode(img));
  },

  hashFile : function(file) {
    return keccak256(bas64_encode(file));
  },

  vaultFile : function(file, adminKey, userKey) {
    var fileString = base64_encode(file);
    var adminEnc = CryptoJS.AES.encrypt(fileString, adminKey).toString();
    return CryptoJS.AES.encrypt(adminEnc, userKey).toString();
  },

  unvaultFile : function(file, adminKey, userKey) {
    var text = fs.readFileSync(file);
    var fromUser = CryptoJS.AES.decrypt(text, userKey).toString(CryptoJS.enc.Utf8);
    return CryptoJS.AES.decrypt(fromUser, adminKey).toString(CryptoJS.enc.Utf8);
  },

  encryptInfo : function(json, adminKey) {
    return CryptoJS.AES.encrypt(JSON.stringify(json), adminKey);
  },

  decryptInfo : function(data, adminKey) {
    var bytes  = CryptoJS.AES.decrypt(data.toString(), adminKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

}
