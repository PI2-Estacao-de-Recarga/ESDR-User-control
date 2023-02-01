export interface GetPlugsResponse {
    id?: string
    name: string
    inUse: boolean
    userId: string
    dateTimeActivated: Date
    dateTimeToDeactivate: Date
    createdAt?: Date
    updatedAt?: Date
}
