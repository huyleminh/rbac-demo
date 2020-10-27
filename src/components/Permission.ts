import { Permission } from "src/Interface/BaseInterface";

export default class PermissionData {
    private _permissions: Array<Permission>;

    constructor() {
        this._permissions = require("../../data/permission-data.json");
    }

    public static init = () => {
        return new PermissionData();
    }

    public getPermission = (idUser: string) => {
        let permissions: Array<Permission> = this._permissions.slice();
        permissions.push(
            {
                isOnlyOrg: true,
                listOrgs: null,
                type: [],
                idUser: idUser
            }
        )

        let index = 0;
        for (let i = 0; ;i++) {
            if (permissions[i].idUser === idUser) {
                index = i;
                break;
            }
        }

        return (index === permissions.length - 1) ? -1 : permissions[index];
    }
}