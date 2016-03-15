'use strict';

const EventEmitter = require('events').EventEmitter;

class Dispatcher extends EventEmitter {
  constructor() {
    super();
  }
}

module.exports = new Dispatcher();
