import { HttpResponse } from "../controllers/helpers/http";
import { HttpRequest } from "../controllers/helpers/http-request";

export interface HttpService{
    post<B, T>(request: HttpRequest<B>): Promise<HttpResponse<T>>;
}
