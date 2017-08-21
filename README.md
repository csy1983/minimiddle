# minimiddle
A mini javascript middleware pattern implementation forked from [darrenscerri/Middleware.js](https://gist.github.com/darrenscerri/5c3b3dcbe4d370435cfa).

## Usage
```
$ npm install --save minimiddle
```
```js
const assert = require('assert');
const Middleware = require('minimiddle');

// Create a middleware instance
var middleware = new Middleware();

// Apply first middleware function
middleware.use((arg, next) => {
  arg.num += 2;
  next();
});

// Apply second middleware function
middleware.use((arg, next) => {
  arg.num *= 3;
  next();
});

// Run middlewares
middleware.go({ num: 0 }, (arg) => {
  assert.ok(arg.num === 6);
});

```

## APIs

- **use(`func(...args, next)`)**: Add middleware function to stack.

```js
// Example 1: middlewares with single argument

middleware.use((arg, next) => {
  arg.msg = 'middleware';
  next();
});

middleware.use((arg, next) => {
  arg.msg += ' example 1';
  next();
});

```

```js
// Example 2: middlewares with multiple arguments

middleware.use((arg1, arg2, arg3, next) => {
  arg1.msg = 'middleware example 2';
  arg2.msg = 'middleware example 2';
  arg3.msg = 'middleware example 2';
  next();
});

middleware.use((arg1, arg2, arg3, next) => {
  arg1.msg += ' arg1';
  arg2.msg += ' arg2';
  arg3.msg += ' arg3';
  next();
});
```

- **go(`...args`, `done(...args)`)**: Run middlewares.

```js
// Example 1 (Cont.): run middleware with single argument
middleware.go({ msg: 'init msg' }, (arg) => {
  console.log(arg.msg); // prints 'middleware example 1'
});
```

```js
// Example 2 (Cont.): run middleware with multiple arguments
middleware.go({ msg: '1st msg' }, { msg: '2nd msg' }, { msg: '3rd msg' }, (arg1, arg2, arg3) => {
  console.log(arg1.msg); // prints 'middleware example 2 arg1'
  console.log(arg2.msg); // prints 'middleware example 2 arg2'
  console.log(arg3.msg); // prints 'middleware example 2 arg3'
});
```
