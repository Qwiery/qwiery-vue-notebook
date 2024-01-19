import { CodeMessage, Message, DataMessage } from "@orbifold/entities";

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

    const Q = {
      renderType: null as string | null, // Update the type of renderType
      renderOptions:null as any,
      x: 45,
      setData(d) {},
      data() {
        Q.renderType = "data";
      },
      chart() {
        Q.renderType = "chart";
      },
    };
    window.Q = Q;
    const scopedEval = (script, scope) =>
      Function(`"use strict"; ${script}`).bind(scope)();

    try {
      const out = scopedEval(message.code, { x: 4 });
      if (Q.renderType) {
        return new DataMessage([], Q.renderType, {
          xaxis: {
            labels: {
              style: {
                colors: "red",
              },
            },
          },
        });
      } else {
        return new CodeMessage(
          out ? out + "\n" + consoleOutput : consoleOutput
        );
      }
    } catch (e) {
      return new CodeMessage(consoleOutput + e);
    }
  }
}
