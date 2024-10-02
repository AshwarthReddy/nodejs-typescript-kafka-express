import { Kafka, Producer, ProducerRecord } from "kafkajs";
import { Service } from "typedi";

@Service()
export class ProducerService {
  private readonly kafka;
  private readonly producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      brokers: ["localhost:29092"],
    });
    this.producer = this.kafka.producer();
  }

  async produce(record: ProducerRecord) {
    await this.producer.connect();
    this.producer
      .send(record)
      .then(() => console.log("message sent successfully"))
      .catch((error) => console.log(`message sent failed, cause of ${error}`));
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
