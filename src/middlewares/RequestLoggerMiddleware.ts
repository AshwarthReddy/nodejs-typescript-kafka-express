import { ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

@Service()
export class RequestLoggerMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: (err?: any) => any) {
    console.log(
      ` request recevied for METHOD : ${request.method} - URL ${request.url} - BODY ${request.body}`
    );
    next();
  }
}
