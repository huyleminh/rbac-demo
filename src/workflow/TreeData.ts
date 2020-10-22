import PermissionList from "src/components/PermissionList";
import { Node } from "src/Interface/BaseInterface";
import FormulaList from "../components/FormulaList";

export default class TreeData {
    private readonly _tree: Array<Node>;

    constructor() {
        this._tree = require("../../data/data.json");        
    }

    public findNodeWithId = (nodeId: string) => {
        let tree: Array<Node> = this._tree.slice(); 
        tree.push({id: nodeId, code: "", name: "", idParent: ""});
        let index = 0;
        
        for (let i = 0; ; i++) {
            if (tree[i].id === nodeId) {
                index = i;
                break;
            }
        }
        if (index === tree.length - 1)
            return "Not found";
        else 
            return tree[index];
    }

    public findNodeWithIdParent = (idParent: string | null) => {
        let result: Array<Node> = [];
        for (let i = 0; i < this._tree.length; i++) {
            if (this._tree[i].idParent === idParent)
                result.push(this._tree[i]);
        }
        return result;
    }

    public findSubTreeFromId = (nodeId: string | null) => {
        let result: Array<Node> = [];
        const root: any = this.findNodeWithId(nodeId);
        if (root === "Not found") {
            if (nodeId !== null)
                return result;
        } else 
            result.push(root);
            
        let childs: Array<Node> = this.findNodeWithIdParent(nodeId);
        for (let i = 0; i < childs.length; i++)
            result = result.concat(this.findSubTreeFromId(childs[i].id));
        
        return result;
    }

    public filter = (userUnit: string | null, formulaId: string) => {
        const formula: Array<{
            target: string | null,
            idPermission: string
        }>  = FormulaList.init().getListFormula(formulaId);
        
        const action: Array<any> = formula.map(element => {
            let view: string = PermissionList.init().getPermissionAction(element.idPermission);
            return {
                target: (element.target === null) ? userUnit : element.target, 
                view: view
            };
        })

        let data: Array<Node> = [];
        for (let i = 0; i < action.length; i++) {
            switch(action[i].view) {
                case "all":
                    data = data.concat(this.findSubTreeFromId(action[i].target));
                    break;
                case "child":
                    data = data.concat(this.findSubTreeFromId(action[i].target));
                    data.shift();
                    break;
                case "self":{
                    let node = this.findNodeWithId(action[i].target);
                    if (typeof(node) !== "string")
                        data = data.concat(node);
                    break;
                }
                default: break;
            }
        }
        return data;
    }
}