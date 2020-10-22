import { Controller, Get } from '@nestjs/common';
import { User } from 'src/Interface/BaseInterface';
import CreateUser from "../workflow/CreateUser";
import MatrixRule from "../workflow/MatrixRule";

@Controller("users")
export default class UserController {
  @Get("/new")
  public createNewUser() {
    const user: User = {name: "user-6", roles: "root"}
    const creator = new CreateUser();
    return creator.createNewUser(user);
  }

  @Get("/view")
  public viewResult() {
    const rule = new MatrixRule();
    rule.init();

    const user: User = {
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
