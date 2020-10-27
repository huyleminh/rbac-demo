import { UnitNode } from "src/Interface/BaseInterface";

export default class UnitTree {
    private _unitTree: Array<UnitNode>;

    constructor() {
        this._unitTree = require("../../data/unit.json")
    }

    public static init = () => {
        return new UnitTree();
    }

    private findUnitNode = (idUnit: string) => {
        let unitTree = this._unitTree.slice();
        unitTree.push({
            idUnit: idUnit,
            idOrg: "",
            idParent: null,
            name: ""
        })

        let index = 0;
        for (let i = 0; ; i++) 
            if (unitTree[i].idUnit === idUnit) {
                index = i;
                break;
            }
        return (index === unitTree.length -1) ? -1 : index;
    }

    public filterUnitIdByOrgId = (org: string) => {
        return this._unitTree.filter(unit => unit.idOrg === org).map(unit => unit.idUnit)
    }

    public getUnitNode = (idUnit: string) => {
        const index = this.findUnitNode(idUnit);
        return (index === -1) ? "Not found" : this._unitTree[index];
    }

    public getChildrenNodeOf = (idParent: string | null) => {
        let parentIndex;
        let result: Array<UnitNode> = [];
        if (idParent !== null) 
            parentIndex = this.findUnitNode(idParent);
        if (parentIndex === -1)
            return result
        
        for (let i = 0; i < this._unitTree.length; i++) {
            if (this._unitTree[i].idParent === idParent)
                result.push(this._unitTree[i]);
        }
        return result;
    }

    public getSubTreeFromUnit = (idUnit: string | null) => {
        let result: Array<UnitNode> = [];
        const node = this.getUnitNode(idUnit);
        if (node === "Not found") {
            if (idUnit !== null)
                return result;
        }
        else 
            result.push(node);
        
        let childs = this.getChildrenNodeOf(idUnit);
        for (let i = 0; i < childs.length; i++)
            result = result.concat(this.getSubTreeFromUnit(childs[i].idUnit));
        return result
    }
}