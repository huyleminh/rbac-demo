export interface UserRole {
    name: string
    roles: string | RolesList
}

export interface RolesList {
    view?: Array<string>,
    create?: Array<string>,
    approve?: Array<string>,
    transfer?: Array<string>
}

export interface UnitNode {
    idUnit: string,
    idOrg: string,
    idParent: string | null
    name: string
}

export interface Orgazination {
    idOrg: string,
    name: string
}

export interface User {
    idUser: string,
    idOrg: string,
    idUnit: string
}

export interface Permission {
    isOnlyOrg: boolean,
    listOrgs: Array<string> | null,
    type: Array<string>,
    idUser: string
}

export interface SpecialPermission {
    idUser: string,
    idRootUnit: string,
    type: string
}