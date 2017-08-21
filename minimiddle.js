class Middleware {
  use(fn) {
    this.go = ((stack) => (...args) => {
      let next = args.pop();
      stack(...args, () => fn(...args, next.bind(next, ...args)));
    })(this.go);
  }

  go(...args) {
    let next = args.pop();
    next(...args);
  }
}

module.exports = Middleware;

