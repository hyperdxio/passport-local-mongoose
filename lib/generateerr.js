// COPIED FROM https://github.com/saintedlama/generaterr/blob/master/index.js

/* jshint expr: true */
const util = require('util');

module.exports = function (name, parameters = {}, options = {}) {
  options.captureStackTrace = options.captureStackTrace !== false;
  const BaseError = options.inherits || Error;

  class CustomError extends BaseError {
    constructor(...args) {
      super();

      if (options.captureStackTrace && Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }

      Object.assign(this, parameters);

      if (args.length > 0) {
        let instanceParams = {};
        if (typeof args[args.length - 1] === 'object' && !Array.isArray(args[args.length - 1])) {
          instanceParams = args.pop();
        }
        Object.assign(this, instanceParams);

        this.message = util.format(...args);
      }

      this.name = name;
    }
  }

  return CustomError;
};
