import mockery from 'mockery';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import dirtyChai from 'dirty-chai';

chai.use(chaiAsPromised);
chai.use(dirtyChai);

const {expect} = chai;

describe('simple-kerberos', function () {
  this.timeout(5000);
  const getSimpleKerberos = errorStage => {
    mockery.disable();
    mockery.deregisterAll();

    /* eslint-disable class-methods-use-this */

    class Kerberos {
      constructor () {
        if (errorStage === 'load') {
          throw new Error('oops');
        }
      }

      authGSSServerInit (bla, cb) {
        if (errorStage === 'init') {
          return cb(new Error('oops'));
        }

        cb(null, {username: 'user'});
      }

      authGSSServerStep (context, token, cb) {
        if (errorStage === 'step') {
          return cb(new Error('oops'));
        }

        cb();
      }

      authGSSServerClean (context, cb) {
        if (errorStage === 'clean') {
          return cb(new Error('oops'));
        }

        cb();
      }
    }

    /* eslint-enable class-methods-use-this */

    mockery.registerMock('kerberos', {Kerberos});
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    return require('../src').default;
  };

  after(() => {
    mockery.disable();
  });

  describe('exports', () => {
    it('should expose a default function', () => {
      expect(getSimpleKerberos()).to.be.a('function');
    });
  });

  describe('usage', () => {
    describe('with errors', () => {
      it('should reject on load', () => {
        expect(() => getSimpleKerberos('load')).to.throw('Simple Kerberos failed to load the "kerberos" module');
      });

      it('should reject on init stage', () => {
        const simpleKerberos = getSimpleKerberos('init');

        return expect(simpleKerberos('bla')).to.be.rejectedWith('Simple Kerberos failed at "init" stage');
      });

      it('should reject on step stage', () => {
        const simpleKerberos = getSimpleKerberos('step');

        return expect(simpleKerberos('bla')).to.be.rejectedWith('Simple Kerberos failed at "step" stage');
      });

      it('should reject on clean stage', () => {
        const simpleKerberos = getSimpleKerberos('clean');

        return expect(simpleKerberos('bla')).to.be.rejectedWith('Simple Kerberos failed at "clean" stage');
      });
    });

    describe('without errors', () => {
      const simpleKerberos = getSimpleKerberos();

      it('should return username', () => {
        return expect(simpleKerberos('bla')).to.eventually.equal('user');
      });
    });
  });
});