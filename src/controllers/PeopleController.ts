import "reflect-metadata";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  UseBefore,
} from "routing-controllers";

import { People } from "../model/People";
import { PeopleServiceImpl } from "../service/PeopleServiceImpl";
import Container, { Service } from "typedi";
import { RequestLoggerMiddleware } from "../middlewares/RequestLoggerMiddleware";
import { UserIsExistsMiddleWare } from "../middlewares/UserExistsMiddleWare";

@JsonController("/api/people")
@UseBefore(RequestLoggerMiddleware)
@Service()
export class PeopleController {
  constructor(private peopleService: PeopleServiceImpl) {}

  @Get("/")
  getAllPeople(): Promise<People[]> {
    console.log("GET ALL PEOPLES API called");
    return this.peopleService.findAllPeople();
  }

  @Get("/:id")
  @UseBefore(UserIsExistsMiddleWare)
  getPeopleById(@Param("id") id: string): Promise<People | null> {
    console.log(`GET PEOPLE ID API called ${id}`);
    return this.peopleService.findById(id);
  }

  @Post()
  savePeople(@Body() myPeople: People): Promise<string> {
    return this.peopleService.savePeople(myPeople);
  }

  @Delete("/:id")
  @UseBefore(UserIsExistsMiddleWare)
  deletePeople(@Param("id") id: string): Promise<string | void> {
    console.log(`DELETE PEOPLE API called :: ${id}`);

    return this.peopleService.deletePeoplebyId(id);
  }

  @Put("/:id")
  @UseBefore(UserIsExistsMiddleWare)
  updateMyPeople(@Param("id") id: string, @Body() myPeople: People) {
    console.log(`update PEOPLE API called :: ${id}`);
    return this.peopleService.updatePeople(id, myPeople);
  }
}
