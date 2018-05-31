#!/bin/sh

geth --datadir $1 --syncmode 'full' --port $2 --rpc --rpcaddr 'localhost' --rpcport $3 --rpcapi 'personal,db,eth,net,web3,txpool,miner' --bootnodes "enode://${ENODE}@${4}:30310" --networkid 22896 --gasprice '1' -unlock ${ACCOUNT} --password $1/password --mine
