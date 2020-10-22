import { Formula } from "../Interface/BaseInterface";


export default class FormulaList {
    private readonly _data: Array<Formula>;

    constructor() {
        this._data = require("../../data/formula.json");        
    }

    public static init = () => {
        return new FormulaList();
    }

    public getListFormula = (formulaId: string) => {
        for (let i = 0; i < this._data.length; i++)
            if (this._data[i].id === formulaId)
                return this._data[i].formula;
        return [];
    }
}