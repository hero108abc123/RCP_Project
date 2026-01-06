export type ViewUserPermission ={
    id: number
    category: string
    key: string
    name: string
}

export type ViewUserRole = {
    id: string
    name: string
    normalizedName: string
    permissions: ViewUserPermission[]
} 

export type ViewUser = {
    id: string
    userName: string
    email: string
    phoneNumber?: string | null
    fullName?: string | null
    birthDay?: string | null
    emailConfirmed: boolean
    phoneNumberConfirmed: boolean
    createdAt: string       
    roles: ViewUserRole[] 
}