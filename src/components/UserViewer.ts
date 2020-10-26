import { Controller, Get } from '@nestjs/common';
import { UserRole } from 'src/Interface/BaseInterface';
import CreateUser from "../workflow/CreateUser";
import MatrixRule from "../workflow/MatrixRule";

@Controller("users")
export default class UserController {
  @Get("/new")
  public createNewUser() {
    const user: UserRole = {name: "user-6", roles: "root"}
    const creator = new CreateUser();
    return creator.createNewUser(user);
  }

  @Get("/view")
  public viewResult() {
    const rule = new MatrixRule();
    rule.init();

    const user: UserRole = {
      name: "user-3",
      roles: {
        view: ["employee"],
        create: ["employee"],
        approve: ["employee"],
        transfer: []
      }
    }
    return rule.enforce(user);
  }
}
