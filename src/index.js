import pify from 'pify';
import SimpleKerberosError from './simple-kerberos-error';

let kerberos;

try {
  const kerberosModule = require('kerberos');

  kerberos = new kerberosModule.Kerberos();
}
catch (err) {
  throw new SimpleKerberosError('Simple Kerberos failed to load the "kerberos" module', err);
}


export default pify((token, cb) => {
  kerberos.authGSSServerInit('HTTP', (err, context) => {
    if (err) {
      return cb(new SimpleKerberosError('Simple Kerberos failed at "init" stage', err));
    }

    kerberos.authGSSServerStep(context, token, err => {
      if (err) {
        return cb(new SimpleKerberosError('Simple Kerberos failed at "step" stage', err));
      }

      const {username} = context;

      kerberos.authGSSServerClean(context, err => {
        if (err) {
          return cb(new SimpleKerberosError('Simple Kerberos failed at "clean" stage', err));
        }

        cb(null, username);
      });
    });
  });
});
