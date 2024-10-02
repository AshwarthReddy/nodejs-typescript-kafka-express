import { DataSource } from "typeorm";
import { People } from "../model/People";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "my-people",
  entities: [People],
  logging: ["query"],
});
