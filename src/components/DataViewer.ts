import {
    Controller,
    Get
} from "@nestjs/common";
import FilterUserData from "src/workflow/FilterUserData";

@Controller("data")
export default class DataController {
    @Get("/view")
    public viewData() {
        return FilterUserData.init().filterByIdUser("us-5");
    }
}