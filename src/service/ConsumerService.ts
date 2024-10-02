import { Service } from "typedi";
import { ConsumerService } from "../kafka/KafkaConsumer";

@Service()
export class TestConsumer {
  constructor(private readonly consumerService: ConsumerService) {}

  public async onConsumer() {
    await this.consumerService.consume(
      { topic: "user-creation" },
      {
        autoCommit: false,
        autoCommitThreshold: 1,
        eachBatchAutoResolve: true,
        partitionsConsumedConcurrently: 8,

        eachMessage: async ({
          topic,
          partition,
          message,
          heartbeat,
          pause,
        }) => {
          console.log("message recevied");
          console.log({
            key: message?.key?.toString(),
            value: message?.value?.toString(),
            headers: message.headers,
          });
        },
      }
    );
  }
}
