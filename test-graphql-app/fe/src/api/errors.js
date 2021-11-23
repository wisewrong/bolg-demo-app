export class ApiError extends Error {
  constructor(message, url) {
    super(message);
    this.message = message;
    this.name = 'ApiError';
    this.url = url;

    this.constructor = ApiError;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
export class ApiTimeoutError extends ApiError {
  constructor(time, url) {
    super('请求超时', url);
    this.name = 'ApiTimeoutError';
    this.time = time;

    this.constructor = ApiTimeoutError;
    Object.setPrototypeOf(this, ApiTimeoutError.prototype);
  }
}
export class ApiServerError extends ApiError {
  constructor(statusCode, url) {
    super(`请求服务器出错：${statusCode}`, url);
    this.name = 'ApiServerError';
    this.statusCode = statusCode;
    this.constructor = ApiServerError;
    Object.setPrototypeOf(this, ApiServerError.prototype);
  }
}

export class ApiBusinessError extends ApiError {
  constructor(message, url, response) {
    super(message, url);
    this.name = 'ApiBusinessError';
    this.constructor = ApiBusinessError;
    Object.setPrototypeOf(this, ApiBusinessError.prototype);
    this.response = response;
  }
}
