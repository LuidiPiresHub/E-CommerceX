export interface IBackendResponse {
  message: string;
}

export interface IBackendResponseError {
  response: {
    data: {
      message: string;
    }
  }
}
