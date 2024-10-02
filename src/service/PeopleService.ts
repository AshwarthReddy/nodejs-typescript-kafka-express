import { People } from "../model/People";

export interface PeopleService {
  findById(id: string): Promise<People | null>;
  findAllPeople(): Promise<People[]>;
  savePeople(people: People): Promise<string>;
  updatePeople(id: string, people: People): Promise<People | null>;
  deletePeoplebyId(id: string): Promise<string | void>;
}
