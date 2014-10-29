var loader = require('../ldr')();

describe('ld', function() {
  var result = '';
  describe('Running three tasks.\n', function() {
    var firstTask = function(done) {
      console.log('1st');
      // Do something interesting.
      done('A');
    },
    secondTask = function(data, done) {
      console.log('2nd');
      // Do something interesting.
      done(data + 'B');
    },
    thirdTask = function(data, done) {
      console.log('3rd.');
      // Do something interesting.
      done(data + 'C');
    };
    beforeEach(function(doneSpec) {
      loader.add(firstTask).add(secondTask).add(thirdTask).go(function(data) {
        result = data;
        doneSpec();
      });
    });
    it('should run tasks sequentially creating the "ABC" string', function(doneSpec) {
      expect(result).toBe('ABC');
      doneSpec();
    });
  });

  describe('Running two tasks.\n', function() {
    var firstTask = function(done) {
      console.log('1st');
      // Do something interesting.
      done('X');
    },
    secondTask = function(data, done) {
      console.log('2nd');
      // Do something interesting.
      done(data + 'Y');
    };
    beforeEach(function(doneSpec) {
      loader.add(firstTask).add(secondTask).go(function(data) {
        result = data;
        doneSpec();
      });
    });
    it('should run tasks sequentially creating the "XY" string', function(doneSpec) {
      expect(result).toBe('XY');
      doneSpec();
    });
  });

  describe('Running several tasks.', function() {
    var power = function(number) {
      return function(done) {
        done(number * number);
      };
    },
    multiply = function(number) {
      return function(data, done) {
        done(data * number);
      }
    },
    minus = function(number) {
      return function(data, done) {
        done(data - number);
      }
    },
    by = function(number) {
      return function(data, done) {
        done(data / number);
      }
    };

    beforeEach(function(doneSpec) {
      loader
        .add(power(5))
        .add(multiply(100))
        .add(minus(500))
        .add(by(200)).go(function(data) {
          result = data;
          doneSpec();
      });
    });

    it('should compute (((5^5)*100)-500)/200', function(doneSpec) {
      expect(result).toBe(10);
      doneSpec();
    });
  });

  describe('Running several tasks without passing a callback to loader.go.', function() {
    var power = function(number) {
      return function(done) {
        done(number * number);
      };
    },
    multiply = function(number) {
      return function(data, done) {
        done(data * number);
      };
    },
    minus = function(number) {
      return function(data, done) {
        done(data - number);
      };
    },
    by = function(number) {
      return function(data, done) {
        done(data / number);
      };
    };
    beforeEach(function(doneSpec) {
      loader
        .add(power(5))
        .add(multiply(100))
        .add(minus(500))
        .add(by(20)).go();
      doneSpec();
    });

    loader.on('done', function(data) {
      result = data;
    });

    it('should compute (((5^5)*100)-500)/200', function(doneSpec) {
      expect(result).toBe(100);
      doneSpec();
    });
  });
});
