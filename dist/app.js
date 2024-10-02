"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const PeopleController_1 = require("./controllers/PeopleController");
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [PeopleController_1.PeopleController],
});
app.listen(3000, () => {
    console.log("app up and running ");
});
