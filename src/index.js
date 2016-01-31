'use strict';

import pify from 'pify';
import kerberosModule from 'kerberos';
const kerberos = new kerberosModule.Kerberos();

export default pify((token, cb) => {
  kerberos.authGSSServerInit('HTTP', (err, context) => {
    if (err) {
      return cb(err);
    }

    kerberos.authGSSServerStep(context, token, err => {
      if (err) {
        return cb(err);
      }

      const principal = context.username;

      kerberos.authGSSServerClean(context, err => {
        if (err) {
          return cb(err);
        }

        cb(null, principal);
      });
    });
  });
});
