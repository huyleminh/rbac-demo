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
        permissions.push({
            isOnlyOrg: true,
            listOrgs: null,
            type: [],
            idUser: idUser
        })

        let index = 0;
        while (permissions[index].idUser !== idUser)
            index++;

        return (index === permissions.length - 1) ? -1 : permissions[index];
    }
}