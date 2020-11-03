import {
    Controller,
    Get,
    Param
} from "@nestjs/common";
import { performance } from "perf_hooks";
import FilterUserData from "src/workflow/FilterUserData";

@Controller("data")
export default class DataController {
    @Get("/view")
    public viewData() {
        let timer = performance.now();

        const users: [] = require("../../data/list-user.json");
        let result = [];
        for (let i = 0; i < users.length; i++) {
            result.push({
                userId: users[i],
                data: FilterUserData.init().filterByIdUser(users[i])
            })
        }

        let timer2 = performance.now();
        console.log("Call to filter data took " + (timer2 - timer) + " milliseconds.")

        return result
    }

    @Get("/view/:id")
    public viewSpecific(@Param("id") param) {
        return FilterUserData.init().filterByIdUser(param)
    }
}