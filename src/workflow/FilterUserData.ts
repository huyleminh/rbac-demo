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

    private getTargetToFilter = (permission: Permission, information: User) => {
        let listTempTargets = permission.type.map(item => {
            if (item !== "special") 
                return {idUnit: information.idUnit, type: item}
            else {
                const special = this.getSpecialPermissionById(information.idUser)
                .map(e => {
                    return {idUnit: e.idRootUnit, type: e.type};
                })
                return special
            }
        })
        
        let targets = [];
        for (let item of listTempTargets) {
            if (Array.isArray(item)) {
                for (let subItem of item) 
                    targets.push(subItem);
            }
            else 
                targets.push(item);
        }
        return targets;
    }

    public filterByIdUser = (idUser: string) => {
        let result: Array<UnitNode> = [];
        const userInformation = this.getUserInformation(idUser);
        
        const userPermissions = PermissionData.init().getPermission(idUser);
        
        //Find user permission
        if (userPermissions === -1) 
            return result;

        if (userPermissions.listOrgs === null) {
            return this.getOrgazinationById(userInformation.idOrg);
        }

        // return targets;
        let targets: Array<{
            idUnit: string,
            type: string
        }> = this.getTargetToFilter(userPermissions, userInformation)
        .filter(target => {
            for (let org of userPermissions.listOrgs) {
                const list = UnitTree.init().filterUnitIdByOrgId(org);
                if (list.indexOf(target.idUnit) !== -1)
                    return true;
            }
            return false;
        })

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
                    break;
            }
        })

        return result;
    }
}