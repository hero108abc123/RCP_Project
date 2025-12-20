import { IRole } from "../role/role.models"

export type IConnectToken = {
  grant_type: string
  username: string
  password: string
  scope: string
  client_id: string
  client_secret: string
}

export type ILogin = {
  username: string
  password: string
}

export type IMe = {
    id?: string | null
    userName?: string | null
    fullName?: string | null
    email?: string | null
    phoneNumber?: string | null
    birthDay?: string | null
    roles? : IRole[]
}