var Middleware = require('.');

describe('Run Tests', function() {
  it('should pass shared variable check', (done) => {
    let middleware = new Middleware();
    let arg = 'Hello';

    middleware.use((next) => {
      setTimeout(() => {
        arg += ' mini';
        next();
      }, 10);
    });

    middleware.use((next) => {
      setTimeout(() => {
        arg += 'middle!';
        next();
      }, 10);
    });

    middleware.go(() => {
      if (arg === 'Hello minimiddle!') {
        done();
      } else {
        done(arg);
      }
    });
  });

  it('should pass single argument check', (done) => {
    let middleware = new Middleware();

    middleware.use((arg, next) => {
      setTimeout(() => {
        arg.str += ' mini';
        next();
      }, 10);
    });

    middleware.use((arg, next) => {
      setTimeout(() => {
        arg.str += 'middle!';
        next();
      }, 10);
    });

    middleware.go({ str: 'Hello' }, (arg) => {
      if (arg.str === 'Hello minimiddle!') {
        done();
      } else {
        done(arg);
      }
    });
  });

  it('should pass multiple arguments check', (done) => {
    let middleware = new Middleware();

    middleware.use((arg1, arg2, next) => {
      setTimeout(() => {
        arg1.num += 2;
        arg2.str += ' mini';
        next();
      }, 10);
    });

    middleware.use((arg1, arg2, next) => {
      setTimeout(() => {
        arg1.num *= 3;
        arg2.str += 'middle!';
        next();
      }, 10);
    });

    middleware.go({ num: 1 }, { str: 'Hello' }, (arg1, arg2) => {
      if (arg1.num === 9 && arg2.str === 'Hello minimiddle!') {
        done();
      } else {
        done({ arg1, arg2 });
      }
    });
  });

  it('should perform 1000! through 1000 middlewares', (done) => {
    let middleware = new Middleware();

    for (let i = 1; i <= 1000; i++) {
      middleware.use((arg, next) => {
        arg.sum += i;
        next();
      });
    }

    middleware.go({ sum: 0 }, (arg) => {
      if (arg.sum === 500500) {
        done();
      } else {
        done(arg.sum);
      }
    });
  });
});
