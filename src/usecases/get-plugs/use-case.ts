import { Plug } from '../../database/entities/plug'
import { PlugsRepository } from '../../repository/port/plug-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetPlugError } from '../set-plug/errors/get-plug-error'

export interface FindPlugs {
  inUse?: boolean
  userId?: string
}

export class GetPlugsUseCase implements UseCase<Plug[]> {
  constructor(private plugRepository: PlugsRepository) {}

  async execute({ inUse, userId }: FindPlugs): Promise<UseCaseReponse<Plug[]>> {
    try {
      const plugsMatch: Plug[] = []

      const plugOne = await this.plugRepository.findOneByName('Tomada 1')
      const plugTwo = await this.plugRepository.findOneByName('Tomada 2')
      const plugThree = await this.plugRepository.findOneByName('Tomada 3')
      if (!plugOne || !plugTwo || !plugThree) {
        return {
          isSuccess: false,
          error: new GetPlugError()
        }
      }
      console.log('USER tomada 1', plugOne.user)
      console.log('USER tomada 2', plugTwo.user)
      console.log('USER tomada 3', plugThree.user)
      const plugsFound: Plug[] = []
      plugsFound.push(plugOne, plugTwo, plugThree)

      // none
      if (inUse === undefined && !userId) {
        plugsMatch.push(plugOne, plugTwo, plugThree)
      } else {
        if (inUse !== undefined) {
          if (userId) {
            // inUse + userId
            plugsFound.forEach((plug, i) => {
              if (plug.inUse === inUse && plug.user.id === userId) {
                plugsMatch.push(plug)
              }
            })
          } else {
            // inUse
            plugsFound.forEach((plug, i) => {
              if (plug.inUse === inUse) {
                plugsMatch.push(plug)
              }
            })
          }
        } else {
          // userId
          plugsFound.forEach((plug, i) => {
            if (plug.user.id === userId) {
              plugsMatch.push(plug)
            }
          })
        }
      }

      return { isSuccess: true, body: plugsMatch }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new GetPlugError()
      }
    }
  }
}
