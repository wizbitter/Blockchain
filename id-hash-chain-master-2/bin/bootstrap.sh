#!/bin/bash

function genPassword {
    LC_ALL=C tr -dc 'A-Za-z0-9!"#$%&'\''()*+,-./:;<=>?@[\]^_`{|}~' </dev/urandom | head -c 13 > $1
}

function initAccount {
    docker run --rm -v /$(pwd):/working ethereum/client-go --datadir /working/$1/$2 account new --password /working/$1/$2/password | sed -e 's/\(.*\){\(.*\)\}\(.*\)/\2/' >> $1/accounts
}

function populateGenesis {
    sed -e 's/<'"$2"'>/'"$3"'/' $1/genesis.json > $1/genesis.json.$2
    mv $1/genesis.json.$2 $1/genesis.json
}

function genBootKey {
    docker run --rm -v /$(pwd):/working --entrypoint bootnode ethereum/client-go:alltools-stable -genkey /working/$1/boot.key
}

function writeENodeAddress {
    docker run --rm -v /$(pwd)/$1:/working --entrypoint bootnode ethereum/client-go:alltools-stable -nodekey /working/boot.key -writeaddress > $1/enode
}

function makeEnv {
    echo -n 'ENODE=' >> $1/dotenv && sed '1q;d' chain/enode >> $1/dotenv
    echo -n 'ACCOUNT=' >> $1/dotenv && echo $2 >> $1/dotenv
}
