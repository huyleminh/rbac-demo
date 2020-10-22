import { 
    User, 
    RolesList 
} from "../Interface/BaseInterface";
import * as fs from "fs";

export default class UpdateUser {
    private _data: User[];

    constructor() {
        this._data = require("../../data/users.json");
    }

    private validateUserName = (name: string) => {
        const names: string[] = this._data.map(item => item.name);
        return (names.indexOf(name) === -1) ? true : false;
    }

    private saveData = () => {
        fs.writeFile("../../data/users.json", JSON.stringify(this._data), (err: any) => {
            if (err) throw err
        });
    }

    public updateUserName = (prevName: string, newName: string) => {
        if (this.validateUserName(prevName) === true)
            return "Undefined user"
        
        if (this.validateUserName(newName) === false)
            return "Existing new name"
        
        this._data.forEach(item => {
            if (item.name === prevName) {
                item.name === newName;
                this.saveData();
                return `Update ${prevName} to ${newName} successfully`
            }
        })       
    }

    public updateUserRole = (name: string, roles: string | RolesList) => {
        if (this.validateUserName(name) === true)
            return "Undefined user"

        this._data.forEach(item => {
            if (item.name === name) {
                if (roles === "")
                    item.roles = "root";
                else if (typeof(roles) !== "string") {
                    for (let key in roles)
                       item[key] = roles[key] 
                }
                else 
                    item.roles = roles;
                this.saveData();
                return `Update ${name} role successfully`
            }
        })
    }
}