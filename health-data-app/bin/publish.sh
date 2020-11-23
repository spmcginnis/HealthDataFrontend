#!/bin/bash -ex

function clearDist () {
    
rm -rf dist
}

clearDist

ng build --base-href "https://spmcginnis.github.io/HealthDataFrontend/" --deploy-url "https://spmcginnis.github.io/HealthDataFrontend/"

pushd dist/health-data-app


# git initialization
git init
git checkout -b gh-pages
git add .
git commit -m "Deploying to gh-pages distribution node, $(date)"
git push --force --quiet "https://github.com/spmcginnis/HealthDataFrontend.git" gh-pages:gh-pages


popd

clearDist
