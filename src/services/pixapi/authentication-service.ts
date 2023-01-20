import { AuthenticationPix } from "../authentication-pix";
import { HttpService } from "../http-service";

interface Token{
    grant_type: string;
    client_secret: string;
    client_id: string;
}

interface TokenResponse{
    access_token: string;
    expires_in: number; 
}

class AuthenticationService implements AuthenticationPix{
    constructor(private axiosClient: HttpService){
    }
    async authentication(){
        const response = {
            success: false
        }
        let tokenRequest: Token
            tokenRequest = {
            grant_type: 'client_credentials',
            client_secret: '',
            client_id: ''
        }
        const {statusCode, body} = await this.axiosClient.post<Token, TokenResponse
        >({
            url:"https://login-api-sandbox.transfeera.com",
            body: tokenRequest,
            headers: {
                'Content-Type': 'application/json',
              },
        });
        if(statusCode !== 200 && statusCode !== 201){
            Object.assign(response, {
                error: 'Não autenticado',
                externalResquest: tokenRequest,
                externalResponse: body,
            });
        }else{
            Object.assign(response, {
                success: true, 
                externalRequest: tokenRequest,
                token: body.access_token,
                externalResponse: '',
                expires_in: body.expires_in
            })
        }
        return response
    }
}

export { AuthenticationService }