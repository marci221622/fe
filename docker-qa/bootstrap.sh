yarn install --frozen-lockfile
CI=false yarn run build:prod && echo done
yarn run start:prod && echo done
