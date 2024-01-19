import { Message, TextMessage,MarkdownMessage } from "@orbifold/entities";
export class FakeInterpreter {
  public async execute(message: Message) {
    switch (message.typeName) {
      case "TextMessage":
        return new TextMessage(
          "This is the output of input " +
            message.id +
            " at " +
            new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
        );
        case "MarkdownMessage":
            return new MarkdownMessage(message.text)
    }
  }
}
