#!/bin/bash

# check current working directory to make sure it is the right one before proceeding, else error message and bail
if [[ "$0" != "bin/publish.sh" ]];
then
    echo "ERR: Please run from the project directory."
    exit 1
fi

set -exuo pipefail

function clearDist () {
    
rm -rf dist
}

clearDist

ng build --prod --base-href "https://spmcginnis.github.io/HealthDataFrontend/" --deploy-url "https://spmcginnis.github.io/HealthDataFrontend/"

pushd dist/health-data-app

mkdir -p assets/api
curl -k https://localhost:5001/api/patients -o assets/api/patients
curl -k https://localhost:5001/api/hospitals -o assets/api/hospitals

# Dealing with github angular routing mismatch
# See https://blog.bitsrc.io/deploy-your-angular-project-to-github-pages-7cbacb96f35b
cp index.html 404.html




# git initialization
git init
git checkout -b gh-pages
git add .
git commit -m "Deploying to gh-pages distribution node, $(date)"
git push --force --quiet "https://github.com/spmcginnis/HealthDataFrontend.git" gh-pages:gh-pages


popd

clearDist
