import eventemitter3 from "eventemitter3";
import {
	Message,
	Notebook,
	CodeMessage,
	NotebookCell,
	TextMessage,
} from "@orbifold/entities";
import { JsInterpreter } from "~/interprete/JsInterpreter";
import _ from "lodash";

/**
 * Represents a (MVC) controller for a notebook.
 * View: NotebookView gets events from the controller and renders the notebook.
 * Model: Notebook (sits in @orbifold/entities) is the model of the notebook.
 */
export class NotebookController extends eventemitter3 {
	setColSpan(id: string, colSpan: any) {
		const cell = this.model.getCellById(id);
		if (cell) {
			cell.colSpan = Math.max(1, Math.min(4, colSpan));
			// this.emit("update-cell", cell.message);
		}
	}

	public model: Notebook = new Notebook();
	/**
	 * The counter for tracking the number of executions.
	 */
	private executionCounter: number = 0;

	/**
	 * The ID of the element that currently has focus.
	 */
	private focusId: string | null = null;

	private _currentView: string = "default";

	constructor() {
		super();
	}

	/**
	 * Adds an input cell to the notebook.
	 *
	 * @param message - The message to be displayed in the cell. If not provided, a random code message will be generated.
	 * @param cellId - The ID of the cell. If not provided, a new ID will be generated.
	 * @param beforeOrAfter - Specifies whether the new cell should be added before or after the specified cell. Default is "after".
	 * @param colSpan - The number of columns the cell should span. Default is 4.
	 */
	public addCell(
		message: Message | null = null,
		cellId: string | null = null,
		beforeOrAfter: string = "after",
		colSpan: number = 4,
	) {
		if (message === null) {
			message = new CodeMessage("Some code here " + Math.random());
		}
		const cell = new NotebookCell(this.model, message, "input");
		cell.colSpan = colSpan;
		this.model.addCell(cell, cellId, beforeOrAfter);
		this.emit("new-cell", cell);
		return cell;
	}

	/**
	 * Adds an output cell to the notebook.
	 *
	 * @param message - The message to be displayed in the output cell. If null, a default message will be generated.
	 * @param cellId - The ID of the input cell to which the output cell is associated.
	 * @returns The newly created output cell.
	 * @throws Error if cellId is null or if no input cell with the specified ID is found.
	 */
	public addOutputCell(
		message: Message | null = null,
		cellId: string | null = null,
	) {
		if (cellId === null) {
			throw new Error("Cannot add an output cell without a cellId.");
		}
		const inputCell = this.model.getCellById(cellId);
		if (!inputCell) {
			throw new Error(`Cannot find a reference input cell with id ${cellId}.`);
		}
		if (message === null) {
			let date = new Date();
			let time = date.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			});
			message = new TextMessage(
				`This is the output of input ${inputCell.index} at ${time}.`,
			);
		}
		const cell = new NotebookCell(
			this.model,
			message,
			"output",
			inputCell.id.toString(),
		);
		cell.inputCellId = inputCell.id;
		this.model.addCell(cell, cellId, "after");
		this.emit("new-cell", cell);
		return cell;
	}

	/**
	 * Gets the cells of the notebook controller.
	 * @returns An array of cells.
	 */
	public get cells() {
		return this.model.cells;
	}

	/**
	 * Sets the focus to the specified id.
	 * @param id - The id of the element to set the focus to.
	 */
	public setFocus(id: string | null) {
		this.focusId = id;
		this.emit("focus", id);
	}

	/**
	 * Deletes a cell with the specified ID.
	 * @param id - The ID of the cell to delete.
	 */
	public deleteCell(id: string) {
		this.model.deleteInput(id);
		this.emit("delete-cell", id);
	}

	public updateCell(message: Message) {
		this.model.updateCell(message);
		this.emit("update-cell", message);
	}

	/**
	 * Sets the execution number for a given message.
	 * @param messageId The ID of the message.
	 * @param cellId The ID of the cell to set.
	 */
	public setExecutionId(messageId: string, cellId: string) {
		const found = this.model.cells.find((m) => m.id === messageId);
		if (found) {
			found.executionId = cellId;
		}
		this.emit("cellId", { messageId, cellId });
	}

	/**
	 * Returns the ordered list of cell id's.
	 * This is also the sequence of message id's since the cell and the message have always the same id.
	 * @returns {string[]} Array of cell IDs.
	 */
	public getCellIds() {
		return this.model.cells.map((m) => m.id);
	}

	public getInputCellIds() {
		return this.model.cells
			.filter((m) => m.direction === "input")
			.map((m) => m.id);
	}

	/**
	 * Retrieves the execution IDs of all cells in the notebook.
	 * If an execution id is null it means the cell has not been executed yet.
	 * @returns An array of execution IDs.
	 */
	public getExecutionIds() {
		return this.model.cells.map((m) => m.executionId);
	}

	public getCellById(id: string) {
		return this.model.getCellById(id);
	}

	public get view() {
		return this._currentView;
	}

	public set view(v) {
		this._currentView = v;
		this.emit("change-view", v);
	}

	public getMessages() {
		return this.model.cells.map((m) => m.message);
	}

	/**
	 * Executes a cell by processing the provided message.
	 * - the In/Out prefix is dynamic, you could change this in function of the interpreter
	 * @param message The message to be executed.
	 */
	public async executeCell(message: Message) {
		const ec = ++this.executionCounter;
		this.setExecutionId(message.id, "In " + ec.toString());

		this.emit("before-execute", message);

		// todo: remove in production
		// await new Promise((r) => setTimeout(r, 2000)); // simulate delay
		const p = new JsInterpreter();
		const a = await p.execute(message);
		const c = this.addOutputCell(a, message.id);
		c.executionId = "Out " + ec;
		this.emit("after-execute", message);
	}

	public async executeAll() {
		const messages = this.getMessages();
		for (const m of messages) {
			await this.executeCell(m);
		}
	}

	public clearAllOutput() {
		this.model.deleteAllOutput();
		this.emit("refresh");
	}

}
