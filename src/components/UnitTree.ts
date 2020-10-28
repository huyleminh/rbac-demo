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
        while (unitTree[index].idUnit !== idUnit) 
            index++;
        
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

    public getChildrenNodeByLevel = (idParent: string | null, levels: number) => {
        let result: Array<UnitNode> = [];
        if (levels === 0)
            return result;
            
        let parentIndex = 0;
        if (idParent !== null)
            parentIndex = this.findUnitNode(idParent);
        if (parentIndex === -1)
            return result;

        let temp: Array<UnitNode> = this.getChildrenNodeOf(idParent);
        result = result.concat(temp);

        for (let i = 1; i < levels; i++) {
            let child: Array<UnitNode> = [];
            for (let j = 0; j < temp.length; j++) {
                child = child.concat(this.getChildrenNodeOf(temp[j].idUnit));
            }
            result = result.concat(child);
            temp = child;
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