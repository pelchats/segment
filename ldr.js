/**
 * github.com/bucaran/ldr
 * Serial loader and invoker for Node.
 * @copyright (c) 2014 Jorge Bucaran
 * @license MIT
 */
var util = require('util'),
    EventEmitter = require('events').EventEmitter;
/**
 * Create new loader object. Add functions with obj.add(Function) and call
 * obj.go() to invoke all functions in sequence without blocking.
 * @constructor
 */
var Loader = module.exports = function() {
  if (!(this instanceof Loader)) return new Loader();
  EventEmitter.call(this);
  this.callees = [];
};
util.inherits(Loader, EventEmitter);
/**
 * Emit done event.
 * @private
 */
Loader.prototype.done = function(data) {
  this.emit('done', data);
};
/**
 * @private
 * @return {Boolean} True if index is valid.
 */
Loader.prototype.has = function(index) {
  return index < this.callees.length;
};
/**
 * Add callback to queue.
 * @param {Function}
 * @return {Object} Returns self.
 */
Loader.prototype.add = function(callback) {
  this.callees.push(callback);
  return this;
};
/**
 * Run all enqueued tasks serially.
 * @private
 * @param {Number} index Index of the next callback.
 * @param {Object, String} data Result of callback, passed to the next.
 */
Loader.prototype.next = function(index, data) {
  if (!this.has(index)) return; // Calling done inside go?

  var self = this, next = function(result) {
    self.next(index + 1, result);
  };
  this.callees[index].call(this, data || next, next);
};
/**
 * Run all enqueued callees.
 * @param {Function} done Invoke after running all enqueued callbacks.
 * Emit 'done' event if undefined.
 */
Loader.prototype.go = function(done) {
  this.callees.push(done || this.done);
  this.next(0);
};
