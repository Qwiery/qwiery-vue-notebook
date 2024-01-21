import { CodeMessage, Message, DataMessage } from "@orbifold/entities";
import _ from "lodash";

export class JsInterpreter {
	public async execute(message: Message) {
		if ((message.typeName !== "CodeMessage")) {
			throw new Error("Message is not a CodeMessage");
		}
		const codeMessage = message as CodeMessage;
		if (codeMessage.language !== "javascript") {
			throw new Error("Language is not javascript");
		}
		let consoleOutput = "";
		console.log = function(value) {
			consoleOutput += value + "\n";
		};

		const Q = {
			renderType: null as string | null, // Update the type of renderType
			renderOptions: null as any,
			chartSeries: [] as any[],
			x: 45,
			setData(d) {
			},
			data(d) {
				Q.renderType = "data";
			},
			chart(chartSeries: any[] = [], renderOptions = {}) {
				Q.renderType = "chart";
				Q.chartSeries = chartSeries;
				Q.renderOptions = renderOptions;
			},
		};
		window["Q"] = Q;
		window["_"] = _;
		const scopedEval = (script, scope) =>
			Function(`"use strict"; ${script}`).bind(scope)();

		try {
			const cleanCode = codeMessage.code.replace(/\n/g, "");
			const out = scopedEval(cleanCode, { x: 4 });
			if (Q.renderType) {
				return new DataMessage(Q.chartSeries, Q.renderType, Q.renderOptions);
			} else {
				return new CodeMessage(
					out ? out + "\n" + consoleOutput : consoleOutput,
				);
			}
		} catch (e) {
			return new CodeMessage(consoleOutput + e);
		}
	}
}
