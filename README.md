Demos for the Web APIs talk. Check out the slides https://speakerdeck.com/orlando/web-apis-2019.

Check my research notes for more information about each API. [NOTES](NOTES.md)

## Install

Since some of the APIs only work with HTTPS, you need to generate a SSL certificate that works in localhost.

This project uses a `prestart` script that copies the SSL certificate to webpack for HTTPS to work.

If you are running OSX, you can do this with https://github.com/FiloSottile/mkcert. Below are the commands you need to run.

```sh
brew install mkcert
mkcert -install

mkdir cert && cd cert
mkcert localhost
```

## How to use

Install with `yarn` and run with `yarn start`
