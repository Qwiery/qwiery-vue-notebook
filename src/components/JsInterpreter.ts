import { CodeMessage, Message, DataMessage, ErrorMessage } from "@orbifold/entities";
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
			bar(chartSeries: any[] = [], renderOptions = {}) {
				Q.renderType = "bar";
				Q.chartSeries = chartSeries;
				Q.renderOptions = renderOptions;
			},
			chart(chartSeries: any[] = [], renderOptions = {}) {
				Q.bar(chartSeries, renderOptions);
			},
			barChart(chartSeries: any[] = [], renderOptions = {}) {
				Q.bar(chartSeries, renderOptions);
			},
			lineChart(chartSeries: any[] = [], renderOptions = {}) {
				Q.line(chartSeries, renderOptions);
			},
			line(chartSeries: any[] = [], renderOptions = {}) {
				Q.renderType = "line";
				Q.chartSeries = chartSeries;
				Q.renderOptions = renderOptions;
			},
			area(chartSeries: any[] = [], renderOptions = {}) {
				Q.renderType = "area";
				Q.chartSeries = chartSeries;
				Q.renderOptions = renderOptions;
			},
			areaChart(chartSeries: any[] = [], renderOptions = {}) {
				Q.area(chartSeries, renderOptions);
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
			return new ErrorMessage(consoleOutput + e);
		}
	}
}
