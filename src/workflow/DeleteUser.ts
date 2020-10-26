import {
    UserRole
} from "../Interface/BaseInterface";
import * as fs from "fs";

export default class DeleteUser {
    private _data: UserRole[];

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

    public deleteUser = (name: string) => {
        if (this.validateUserName(name) === true)
            return "Undefined user"
        this._data = this._data.filter(item => item.name !== name);
        this.saveData();
        return `Delete ${name} successfully`
    }
}