"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleController = void 0;
const routing_controllers_1 = require("routing-controllers");
let PeopleController = class PeopleController {
    constructor() {
        this.PEOPLES_DB = [];
    }
    getAllPeople() {
        console.log("GET ALL PEOPLES API called");
        return this.PEOPLES_DB;
    }
    getPeopleById(id) {
        console.log("GET PEOPLE ID API called");
        let peoples = this.PEOPLES_DB.filter((data) => data.id && data.id === id);
        return peoples;
    }
    savePeople(myPeople) {
        let id = Math.random();
        console.log(`save PEOPLE API called :: ${id}`);
        myPeople.id = id;
        this.PEOPLES_DB.push(myPeople);
        return myPeople;
    }
    deletePeople(id) {
        let peopleId = this.PEOPLES_DB.findIndex((data) => data.id === id);
        console.log(`DELETE PEOPLE API called :: ${id}`);
        if (peopleId != null) {
            this.PEOPLES_DB.splice(peopleId, 1);
        }
    }
    updateMyPeople(id, myPeople) {
        console.log(`update PEOPLE API called :: ${id}`);
        this.PEOPLES_DB.map((data) => data.id && data.id === id ? Object.assign(Object.assign({}, data), { myPeople }) : data);
        console.log(`people updated successfully`);
        return this.PEOPLES_DB.filter((people) => people.id === id);
    }
};
exports.PeopleController = PeopleController;
__decorate([
    (0, routing_controllers_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], PeopleController.prototype, "getAllPeople", null);
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Array)
], PeopleController.prototype, "getPeopleById", null);
__decorate([
    (0, routing_controllers_1.Get)("/"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [People]),
    __metadata("design:returntype", People)
], PeopleController.prototype, "savePeople", null);
__decorate([
    (0, routing_controllers_1.Delete)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "deletePeople", null);
__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, People]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "updateMyPeople", null);
exports.PeopleController = PeopleController = __decorate([
    (0, routing_controllers_1.JsonController)("/api/people")
], PeopleController);
class People {
}
