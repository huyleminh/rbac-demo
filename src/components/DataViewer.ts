import {
    Controller,
    Get
} from "@nestjs/common";
import FilterUserData from "src/workflow/FilterUserData";

@Controller("data")
export default class DataController {
    @Get("/view")
    public viewData() {
        let result = [];
        for (let i = 0; i < 7; i++) {
            const user = "us-" + (i + 1);
            result.push({
                userId: user,
                data: FilterUserData.init().filterByIdUser(user)
            })
        }
        return result
    }
}