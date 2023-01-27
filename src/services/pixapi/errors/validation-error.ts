export class ValidationError extends Error {
    public body: any;

    constructor(body: any) {
        super();
        this.body = body;
      }
  }