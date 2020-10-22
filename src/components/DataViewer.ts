import {
    Controller,
    Get
} from "@nestjs/common";
import TreeData from "src/workflow/TreeData";

@Controller("data")
export default class DataController {
    @Get("/view")
    public viewData() {
        const tree = new TreeData();
        return tree.filter(null, "F4");
    }
}