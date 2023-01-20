import { HttpService } from "./http-service";
import axios, { AxiosInstance } from 'axios';
import { HttpResponse } from "../controllers/helpers/http";
import { HttpRequest } from "../controllers/helpers/http-request";

export class AxiosService implements HttpService {
    private clientAxios: AxiosInstance 
    constructor() {
        this.clientAxios = axios.create();
      }
    async post<B, T>(request: HttpRequest<B>): Promise<HttpResponse<T>> {
        const response = await this.clientAxios.post(request.url,request.body,{headers:request.headers, params:request.params})

        return {
            statusCode:response.status,
            body:response.data}

    }
}