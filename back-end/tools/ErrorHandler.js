const logger = require('winston');

class ErrorHandler {
  static general(error, req, res) {
    logger.info(error.stack);
    res.status(error.statusCode || error.status);
    res.render('error', { error });
  }

  static response(respond, message = '', status = 200) {
    logger.info(message);
    respond.status(status).json({
	  status,
	  error: message
	});
  }
}

module.exports = ErrorHandler;
