# simple-kerberos [![Build Status](https://travis-ci.org/noamokman/simple-kerberos.svg?branch=master)](https://travis-ci.org/noamokman/simple-kerberos)

Kerberos for web servers made simple

## Installation
``` bash
$ [sudo] npm install simple-kerberos --save
```

## Usage

The module takes a token and uses the [kerberos module](https://github.com/christkv/kerberos) to find the matching principle

### Example
``` js
import simpleKerberos from 'simple-kerberos';

simpleKerberos('my-token')
  .then(username => {
    console.log(username); // outputs the username matching the given token
  });
```

## Related

- [express-auth-negotiate](https://github.com/omrilitov/express-auth-negotiate) - Express middleware to get the token
- [kerberos](https://github.com/christkv/kerberos) - The underlying kerberos module
- [express-kerberos](https://github.com/noamokman/express-kerberos) - One middleware to enable kerberos authentication

## License

[MIT](LICENSE)