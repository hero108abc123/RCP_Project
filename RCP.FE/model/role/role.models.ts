import { IPermissions } from "../permissions/permissions.models"

export type IRole = {
    id?: number
    name?: string
    permissions: IPermissions[]
}