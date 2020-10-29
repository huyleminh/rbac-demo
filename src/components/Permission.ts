import { Permission } from "src/Interface/BaseInterface";

export default class PermissionData {
    private _permissions: Array<Permission>;

    constructor() {
        this._permissions = require("../../data/permission-data.json");
    }

    public static init = () => {
        return new PermissionData();
    }

    public getPermissionById = (idUser: string) => {
        let permissions: Array<Permission> = this._permissions.slice();
        return permissions.filter(permission => permission.idUser === idUser);
    }
}