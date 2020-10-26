import { UserRole } from "src/Interface/BaseInterface";

export default class MatrixRule {
    private _matrix: Array<Array<any>>;
    private _root: Array<string>;
    private _group: Array<any>;

    constructor() {
        this._matrix = [];
        this._root = [];
        this._group = [];
    }

    public init = () => {
        const users: Array<any> = require("../../data/role-policy.json");
        let items: Array<string> = [];

        for (let key1 in users) {
            this._root.push(key1)
            for (let key2 in users[key1]) {
                this._group.push(key2)
                items.push(users[key1][key2]);
            }
        }

        //Remove duplicate
        this._group = this._group.filter((item, index) => {
            return this._group.indexOf(item) === index
        })
        
        this._matrix.length = this._root.length + 1;

        //base matrix has title only
        for (let i = 0; i < this._matrix.length; i++) {
            this._matrix[i] = new Array(this._group.length + 1);
            this._matrix[0] = ["root", ...this._group];
            this._matrix[i][0] = this._root[i - 1];
        }

        let k = 0;
        for (let i = 1; i < this._matrix.length; i++) {        
            for (let j = 1; j < this._matrix[i].length; j++) {
                this._matrix[i][j] = items[k++]
            }
        }
    }

    public matrix = () => {
        return this._matrix
    }

    public enforce = (user: UserRole) => {
        const roles = user.roles;
        if (roles === "root" || roles === "all")
            return true;
        else if (typeof(roles) !== "string") {
            for (let key in roles) {
                if (this._root.indexOf(key) === -1)
                    return false;
                for (let childKey of roles[key]) {
                    if (this._group.indexOf(childKey) === -1)
                        return false;
                }
            }
            return true;
        }
    }
}