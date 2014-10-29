# _ldr_ Loader

> Sequential task loader for Node.

[![Build Status][TravisLogo]][Travis]

## Install

```sh
npm install ldr
```

## Definition

_ldr_ is a task loader for Node. Add _tasks_ with `add(Function)` and call `go()` when you are ready. Tasks will execute asynchronously, but in the sequence in which they were added.

## Usage
```js
var loader = require('../ldr')();
loader.add(minify)
      .add(concat)
      .add(deploy)
      .add(clean).go();
```

## Tasks

Tasks are functions to be invoked by _ldr_ taking an optional data argument: the result from the last task in a series, and a function to be called by the client when the task is completed.

```js
var myTask = function(done) {
  // Do something interesting.
  done(result);
},
anotherTask = function(data, done) {
  // data is the result from myTask.
  done(result);
};

loader.add(myTask).add(anotherTask);
```

### Tasks with arguments

Tasks that take arguments can be accomplished with closures.

```js
var power = function(number) {
  return function(done) {
    done(number * number);
  };
};
loader.add(power(7));
```
### Signature

Tasks are either `function(done)` or `function(data, done)`. The first only occurs in the first task of a series or when calling `done()` without arguments in the previous task.

## Api

### `Loader.add(done)`

Push a task to the queue list. Returns an instance of itself to allow chaining calls like in the previous examples.

### `Loader.go([done])`

Run all enqueued tasks in added order. Optionally pass a function that is called after all tasks are completed. If undefined, a `done` event will be emitted.

```js
var myTask = function(done) {
  // Do something interesting.
  done(result);
};

loader.add(myTask).go();
loader.on('done', function(data) {
  // Do something interesting.
});
```

## License

![MIT] by [Jorge Bucaran][Homepage]

[MIT]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[Homepage]: http://bucaran.me
[TravisLogo]: https://travis-ci.org/bucaran/ldr.svg?branch=master
[Travis]: https://travis-ci.org/bucaran/ldr
