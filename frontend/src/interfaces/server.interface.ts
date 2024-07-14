export interface IBackendCheckoutResponse {
  message: string;
}

export interface IBackendResponseError {
  response: {
    data: {
      message: string;
    }
  }
}
