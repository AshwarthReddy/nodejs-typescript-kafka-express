import { Request, Response } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { AppDataSource } from "../repo/AppDataSource";
import { People } from "../model/People";
import { Service } from "typedi";

@Service()
export class UserIsExistsMiddleWare implements ExpressMiddlewareInterface {
  async use(request: Request, response: Response, next: (err?: any) => any) {
    let userId: string = request.params.id;

    let user = await AppDataSource.getMongoRepository(People).findOneBy({
      id: userId,
    });
    if (!user) response.status(404).send(`user not found :: ${userId}`);
  }
}
