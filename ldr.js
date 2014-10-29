/**
 * github.com/bucaran/ldr
 * Sequential task loader for Node.
 *
 * @copyright (c) 2014 Jorge Bucaran
 * @license MIT
 */
var util = require('util'),
    events = require('events');
/**
 * Create a new loader object. Add functions with add(Function) and call
 * `go` to invoke all functions sequentially without blocking.
 *
 * @constructor
 */
var Loader = module.exports = function() {
  if (!(this instanceof Loader)) return new Loader();

  events.EventEmitter.call(this);
  /**
   * @type {Array} callees List of enqueued tasks.
   */
  this.callees = [];
  /**
   * @type {Boolean} shouldEmit Emit done event if no callback is passed when
   * calling `go`.
   */
  this.shouldEmit;
  /**
   * @type {Number} cursor Track new callbacks index.
   */
  this.cursor = 0;
};
util.inherits(Loader, events.EventEmitter);
/**
 * Emit done event if shouldEmit is true.
 * @param {Mixed} data Result from last task.
 * @private
 */
Loader.prototype.done = function(data) {
  if (this.shouldEmit) this.emit('done', data);
};
/**
 * Add callback to queue.
 * @param {Function}
 * @return {Object} Intance of self.
 */
Loader.prototype.add = function(callback) {
  if (this.cursor === 0) this.callees = [];
  // Reset callback list when adding the first item.
  this.callees[this.cursor++] = callback;
  return this;
};
/**
 * Run the task at index. Pass a callback to the client to run the next task
 * in the queue when the task is completed.
 *
 * @private
 * @param {Number} index Index of the next callback.
 * @param {Mixed} data Result of callback, passed to the next.
 */
Loader.prototype.next = function(index, data) {
  if (!(index < this.callees.length)) return;
  var self = this, next = function(result) {
    self.next(index + 1, result);
  };
  /**
   * Call enqueued tasks with the result from the last task and a function
   * to be called by the client when the task is completed.
   */
  this.callees[index].call(this, data || next, data ? next : undefined);
};
/**
 * Run all enqueued tasks in added order.
 * @param {Function} done Call after running all enqueued tasks. Emit done
 * event if undefined.
 */
Loader.prototype.go = function(done) {
  this.shouldEmit = !done;
  if (done) this.callees[this.cursor++] = done;
  this.callees[this.cursor++] = this.done;
  this.next(this.cursor = 0);
};
