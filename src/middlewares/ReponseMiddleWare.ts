import { Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";

@Middleware({ type: "after" })
@Service()
export class ResponseMiddleWare implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: (err?: any) => any) {
    console.log(
      `Response Details: URL ${request.url} - STATUS ${response.statusCode}`
    );
    next();
  }
}
