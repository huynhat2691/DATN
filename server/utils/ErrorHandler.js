// function ErrorHandler(message, statusCode) {
//   const instance = new Error(message);
//   instance.statusCode = statusCode;
//   Error.captureStackTrace(instance, ErrorHandler);
//   return instance;
// }

// module.exports = ErrorHandler;

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // Gọi constructor của lớp Error
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;