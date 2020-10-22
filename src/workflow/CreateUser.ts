import * as fs from "fs";
import { User } from "../Interface/BaseInterface";

export default class CreateUser {
    private _data: User[];

    constructor() {
      this._data = require("../../data/users.json");
    }

    public createNewUser = (user: User) => {
        if (user.name === "" || null)
            return "Undefined user";
        const names: string[] = this._data.map(item => item.name);
        if (names.indexOf(user.name) !== -1)
            return "Existing user"
        else 
            this._data.push(user);
        
        fs.writeFile("../../../data/users.json", JSON.stringify(this._data), (err: any) => {
            if (err) throw err
        });

        return "Success"
    }
}