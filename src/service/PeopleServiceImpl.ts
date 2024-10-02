import "reflect-metadata";
import { People } from "../model/People";
import { Service } from "typedi";
import { PeopleService } from "./PeopleService";
import { AppDataSource } from "../repo/AppDataSource";
import { ProducerService } from "../kafka/ProducerService";
import { ConsumerService } from "../kafka/KafkaConsumer";

@Service()
export class PeopleServiceImpl implements PeopleService {
  constructor(
    private kafkaProducer: ProducerService,
    private consumer: ConsumerService
  ) {}

  findById(id: string): Promise<People | null> {
    console.log(`PeopleService :: findById(${id})`);
    return AppDataSource.getMongoRepository(People).findOneBy({ id: id });
  }
  findAllPeople(): Promise<People[]> {
    console.log(`PeopleService :: findAllPeople`);
    return AppDataSource.getMongoRepository(People).find();
  }
  async savePeople(people: People): Promise<string> {
    console.log(`PeopleService :: savePeople ${JSON.stringify(people)}`);
    let peopleEntity = await AppDataSource.getMongoRepository(People).save(
      people
    );
    this.kafkaProducer.produce({
      topic: "user-creation",
      messages: [{ value: JSON.stringify(peopleEntity) }],
    });
    this.consumer.consume('user-creation', )
    return `People saved successfully with Id :: ${peopleEntity.id}`;
  }
  updatePeople(id: string, people: People): Promise<People | null> {
    console.log(
      `PeopleService :: updatePeople(${id}) ${JSON.stringify(people)}`
    );
    AppDataSource.getMongoRepository(People).update({ id: id }, people);
    return Promise.resolve(people);
  }
  deletePeoplebyId(id: string): Promise<string | void> {
    console.log(`PeopleService :: deletePeoplebyId(${id})`);
    return AppDataSource.getMongoRepository(People)
      .deleteOne({ id: id })
      .then(
        (data) =>
          `people deleted successfully, user no more exists ${data.deletedCount}`
      )
      .catch((error: Error) => console.error(error.message));
  }
}
