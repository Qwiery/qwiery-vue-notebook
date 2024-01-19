import { CodeMessage, Message } from "@orbifold/entities";

export class JsInterpreter {
  public async execute(message: Message) {
    if (!(message instanceof CodeMessage)) {
      throw new Error("Message is not a CodeMessage");
    }
    if (message.language !== "javascript") {
      throw new Error("Language is not javascript");
    }
    let consoleOutput = "";
    console.log = function (value) {
      consoleOutput += value + "\n";
    };
    window.Q = { x: 45,
        setData(d){

        }
    };
    const scopedEval = (script, scope) =>
      Function(`"use strict"; ${script}`).bind(scope)();

    try {
      const out = scopedEval(message.code, { x: 4 });
      return new CodeMessage(out ? out + "\n" + consoleOutput : consoleOutput);
    } catch (e) {
      return new CodeMessage(consoleOutput + e);
    }
  }
}
