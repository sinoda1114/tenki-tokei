class ErrorHandler {
  constructor(logger) {
    this.logger = logger || console;
  }

  handleAPIError(error, userMessage) {
    this.logger.error("API Error:", error);
    if (userMessage) {
      alert(userMessage); // or a more sophisticated user feedback mechanism
    }
  }

  handleError(error, userMessage) {
    this.logger.error("Error:", error);
    if (userMessage) {
      alert(userMessage);
    }
  }
}

export default ErrorHandler;