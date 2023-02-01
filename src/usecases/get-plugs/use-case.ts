import { Plug } from '../../database/entities/plug'
import { PlugsRepository } from '../../repository/port/plug-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetUserError } from '../get-user/errors/get-user-error'
import { GetPlugError } from '../set-plug/errors/get-plug-error'
import { GetPlugsResponse } from './domain/get-plugs-response'

export interface FindPlugs {
    inUse?: boolean
    userId?: string
}

export class GetPlugsUseCase implements UseCase<Plug[]> {
    constructor(private plugRepository: PlugsRepository) { }

    async execute({ inUse, userId }: FindPlugs): Promise<UseCaseReponse<Plug[]>> {
        try {

            let plugsMatch: Plug[] = []

            const plugOne = await this.plugRepository.findOneByName('Tomada 1')
            const plugTwo = await this.plugRepository.findOneByName('Tomada 2')
            const plugThree = await this.plugRepository.findOneByName('Tomada 3')
            if (!plugOne || !plugTwo || !plugThree) {
                return {
                    isSuccess: false,
                    error: new GetPlugError()
                }
            }
            let plugsFound: Plug[] = []
            plugsFound.push(plugOne, plugTwo, plugThree)

            if (!inUse && !userId) {
                plugsMatch.push(plugOne, plugTwo, plugThree)
            } else {
                if (inUse) {
                    if (userId) {
                        plugsFound.forEach((plug, i) => {
                            if (plug.inUse === inUse && plug.user.id === userId) {
                                plugsMatch.push(plug)
                            }
                        }
                        )
                    }
                    plugsFound.forEach((plug, i) => {
                        if (plug.inUse === inUse) {
                            plugsMatch.push(plug)
                        }
                    }
                    )
                }
            }
            if (plugsMatch.length > 0) {
                return { isSuccess: true, body: plugsMatch }
            } else {
                return {
                    isSuccess: false,
                    error: new GetUserError()
                }
            }
        } catch (error) {
            console.log(error)
            return {
                isSuccess: false,
                error: new GetUserError()
            }
        }
    }
}
