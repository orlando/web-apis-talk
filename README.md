This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install

Since some of the APIs only work with HTTPS, you need to generate a SSL certificate that works in localhost.

This project uses a `prestart` script that copies the SSL certificate to webpack for HTTPS to work.

If you are running OSX, you can do it with https://github.com/FiloSottile/mkcert. Below are the commands you need to run.

```sh
brew install mkcert
mkcert -install

mkdir cert && cd cert
mkcert localhost
```

## How to use

Install with `yarn` and run with `yarn start`
