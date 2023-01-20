interface OrderPixServiceResponse<T> {
    success: boolean;
    error?: Error;
    info?: T;
    externalResponse?: object;
    externalRequest?: object;
  }
  
  export { OrderPixServiceResponse };
  