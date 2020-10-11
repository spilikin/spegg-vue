#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build


mkdir -p staging
rm -rf staging/dist
cp -r dist staging/
cp Dockerfile nginx.conf staging/
cd staging

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git push -f git@github.com:spilikin/spegg-vue.git master:staging


cd -