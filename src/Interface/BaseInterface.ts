export interface User {
    name: string
    roles: string | RolesList
}

export interface RolesList {
    view?: Array<string>,
    create?: Array<string>,
    approve?: Array<string>,
    transfer?: Array<string>
}

export interface Node {
    id: string,
    code: string,
    name: string,
    idParent: string
}

export interface Formula {
    id: string,
    formula: Array<{
        target: string | null,
        idPermission: string
    }>
}

export interface Permission {
    id: string,
    view: string
}