# ID Hash Chain

Contracts and API for secure blockchain id hashing

## Useage

for development environment run
```bash
./id-chain hack
```

(requires docker)

## RESTful Blockchain API

api exposed over http://localhost:3000

api functions (available via GET or POST)

http://localhost:3000/api/addDocument/:user/:hash/:type/:expires - adds a hash of a document of a type for a user

http://localhost:3000/api/valid/:user/:hash - checks document validity given user and hash

http://localhost:3000/api/isValidated/:user - checks if a user has been validated
 
http://localhost:3000/api/validateUser/:user - validates a given user

http://localhost:3000/api/invalidateUser/:user - invalidates a given user

http://localhost:3000/api/isExpired/:user/:hash/ - checks if a hash given for a user has expired


## Client API

from src/app/client.js

hashDetails (json) - takes a json object and returns a hash for that object 

hashImage (img) - takes an image file and returns a hash for that file

hashFile (file) - takes a file and returns a hash for that file

vaultFile (file, adminKey, userKey) - takes a file to encrypt and admin and user keys and returns an encrypted sting for that file

unvaultFile (file, adminKey, userKey) - takes a file containing encrypted output from vaultFile and user and admin keys and returns a decrypted, base64 encoded string representing the file

encryptInfo (json, adminKey) - takes a json object and an adminKey and returns an encrypted string representing the json

decryptInfo (data, adminKey) - takes an encrypted json object and an adminKey and returns the decrypted object







