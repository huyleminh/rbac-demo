import PermissionData from "src/components/Permission";
import UnitTree from "src/components/UnitTree";
import { Orgazination, Permission, SpecialPermission, UnitNode, User } from "src/Interface/BaseInterface";

export default class FilterUserData {
    public static init = () => {
        return new FilterUserData;
    }

    private getUserInformation = (idUser: string) => {
        const userInformation: Array<User> = require("../../data/user.json");
        for (let i = 0; i < userInformation.length; i++)
            if (userInformation[i].idUser === idUser)
                return userInformation[i];
    }

    private getOrgazinationById = (idOrg: string) => {
        const orgs: Array<Orgazination> = require("../../data/orgazination.json");
        for (let i = 0; i < orgs.length; i++)
            if (orgs[i].idOrg === idOrg)
                return orgs[i];
    }

    private getSpecialPermissionById = (idUser: string) => {
        const special: Array<SpecialPermission> = require("../../data/special-permission.json");
        return special.filter(item => item.idUser === idUser);
    }

    private getTargetToFilter = (permissions: Array<Permission>, information: User) => {        
        let listTempTargets = permissions
        .map(permission => {
            if (permission.type !== "special") 
                return {idUnit: information.idUnit, type: permission.type}
            else {
                //get special target
                const special = this.getSpecialPermissionById(information.idUser)
                .map(item => {
                    if (UnitTree.init().validateUnitByOrg(item.idRootUnit, permission.idOrg))
                        return {idUnit: item.idRootUnit, type: item.type}
                })
                return special;
            }
        })
        
        let targets = [];
        for (let item of listTempTargets) {
            if (Array.isArray(item)) {
                for (let subItem of item) 
                    targets.push(subItem);
            }
            else targets.push(item);
        }
        //Remove undefined target from map method
        return targets.filter(target => target !== undefined)
    }

    public filterByIdUser = (idUser: string) => {
        let result: Array<UnitNode> = [];
        const userInformation = this.getUserInformation(idUser);
        const userPermissions = PermissionData.init().getPermissionById(idUser);
        
        //Find user permission
        if (userPermissions.length === 0)
            return result;

        // return targets;
        let targets: Array<{
            idUnit: string,
            type: string
        }> = this.getTargetToFilter(userPermissions, userInformation)

        targets.forEach(target => {
            switch (target.type) {
                case "all":
                    result = result.concat(UnitTree.init().getSubTreeFromUnit(target.idUnit));
                    break;
                case "child":
                    const list = UnitTree.init().getSubTreeFromUnit(target.idUnit);
                    list.shift()
                    result = result.concat(list);
                    break;
                case "self":
                    const node = UnitTree.init().getUnitNode(target.idUnit);
                    if (typeof(node) !== "string")
                        result = result.concat(node);
                default: 
                    if (target.type.match(/^(child-)\d$/g) === null) 
                        break;
                    const childLevel = target.type.split("-");
                    result = result.concat(UnitTree.init().getChildrenNodeByLevel(target.idUnit, parseInt(childLevel[1])));
                    break;
            }
        })
        
        return {
            org: this.getOrgazinationById(userInformation.idOrg),
            unit: result
        }
    }
}