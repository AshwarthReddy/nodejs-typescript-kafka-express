import { Consumer, ConsumerRunConfig, Kafka } from "kafkajs";
import { Service } from "typedi";

@Service()
export class ConsumerService {
  private readonly kafka;
  constructor() {
    this.kafka = new Kafka({
      brokers: ["localhost:29092"],
    });
  }

  async consume(topic: string) {
    const consumer = this.kafka.consumer({ groupId: "test-consumer-group" });
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log("message recevied");
        console.log({
          key: message?.key?.toString(),
          value: message?.value?.toString(),
          headers: message.headers,
        });
      },
    });
  }
}
