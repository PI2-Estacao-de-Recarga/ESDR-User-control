import { Repository } from '../../repository/port/user-repository'
import { PlugNameError } from './errors/plug-name-error'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetUserError } from '../get-user/errors/get-user-error'
import { PlugNameEnum } from '../../database/entities/enums/plugName'
import { SetPlugRequest } from './domain/set-plug-request'
import { SetPlugResponse } from './domain/set-plug-response'
import { SetPlugError } from './errors/set-plug-error'
import { GetPlugError } from './errors/get-plug-error'
import { PlugsRepository } from '../../repository/port/plug-repository'
import { User } from '../../database/entities/user'

export class SetPlugUseCase implements UseCase<SetPlugResponse> {
    constructor(
        private plugRepository: PlugsRepository,
        private userRepository: Repository,
    ) { }

    async execute(
        payload: SetPlugRequest
    ): Promise<UseCaseReponse<SetPlugResponse>> {
        try {

            const user = await this.userRepository.findOneById(payload.userId)
            if (!user) {
                return {
                    isSuccess: false,
                    error: new GetUserError()
                }
            }

            if (payload.name !== PlugNameEnum.UM && payload.name !== PlugNameEnum.DOIS && payload.name !== PlugNameEnum.TRES) {
                return {
                    isSuccess: false,
                    error: new PlugNameError()
                }
            }

            const plugFound = await this.plugRepository.findOneByName(payload.name)
            if (!plugFound) {
                return {
                    isSuccess: false,
                    error: new GetPlugError()
                }
            }

            let timestampActive = Date.now()
            console.log("TIMESTAMP:", timestampActive)

            let timestampDeactive = timestampActive + (payload.timeAmount * 60000)

            let dateActive = new Date(timestampActive)
            console.log("DATE:", dateActive)

            let dateDeactive = new Date(timestampDeactive)
            console.log("DATE:", dateDeactive)

            let updatedPlug

            let userVazio = new User()

            if (plugFound.inUse) {
                updatedPlug = await this.plugRepository.updatePlug(
                    payload.name,
                    plugFound.dateTimeActivated,
                    plugFound.dateTimeToDeactivate,
                    false,
                    userVazio
                )
            } else {
                updatedPlug = await this.plugRepository.updatePlug(
                    payload.name,
                    dateActive,
                    dateDeactive,
                    true,
                    user
                )
            }

            if (updatedPlug) {
                return {
                    isSuccess: true,
                    body: {
                        name: payload.name,
                        dateTimeActivated: updatedPlug.dateTimeActivated,
                        dateTimeToDeActivate: updatedPlug.dateTimeToDeactivate,
                        inUse: updatedPlug.inUse,
                        // user: plugFound.user,
                    }
                }
            } else {
                return {
                    isSuccess: false,
                    error: new SetPlugError()
                }
            }
        } catch (error) {

            console.log(error)
            return {
                isSuccess: false,
                error: new SetPlugError()
            }
        }
    }
}