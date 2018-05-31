function cleanup-dev {
    docker-compose -p id-chain-dev -f vm/docker-compose.devbox.yml kill
    docker-compose -p id-chain-dev -f vm/docker-compose.devbox.yml rm -f
}

function hack {
    docker-compose -p id-chain-dev -f vm/docker-compose.devbox.yml up -d
}

function prod {
    docker-compose -p id-chain-prod -f vm/docker-compose.prod.yml up -d
}

function build {
    docker-compose -p id-chain-dev -f vm/docker-compose.devbox.yml build
}

