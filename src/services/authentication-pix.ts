import { AuthenticationResponse } from '../controllers/helpers/authentication-service'

export interface AuthenticationPix {
  authentication(): Promise<AuthenticationResponse>
}
