import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { PeopleController } from "./controllers/PeopleController";
import { AppDataSource } from "./repo/AppDataSource";
import { Container } from "typedi";
import { RequestLoggerMiddleware } from "./middlewares/RequestLoggerMiddleware";
import { ResponseMiddleWare } from "./middlewares/ReponseMiddleWare";


useContainer(Container);



const app = createExpressServer({
  controllers: [PeopleController],
  middlewares: [ResponseMiddleWare],
});

initializeDataSource();

app.listen(3000, () => {
  console.log("app up and running ");
});

function initializeDataSource() {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
      process.exit(0);
    });
}
