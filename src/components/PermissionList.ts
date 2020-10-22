import { Permission } from "src/Interface/BaseInterface";

export default class PermissionList {
    private readonly _data: Array<Permission>;

    constructor() {
        this._data = require("../../data/permission.json");        
    }

    public static init = () => {
        return new PermissionList();
    }

    public getPermissionAction = (permissionId: string) => {
        for (let i = 0; i < this._data.length; i++) {
            if (this._data[i].id === permissionId) 
                return this._data[i].view;
        }
        return "";
    }
}