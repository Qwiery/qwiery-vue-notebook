import eventemitter3 from "eventemitter3";
import {
  Message,
  Notebook,
  CodeMessage,
  NotebookCell,
  TextMessage,
} from "@orbifold/entities";
export class NotebookController extends eventemitter3 {
  public model: Notebook = new Notebook();
  public counter: number = 0;
  public focusId: string | null = null;
  constructor() {
    super();
  }
  public addInputCell(
    message: Message | null = null,
    cellId: string | null = null,
    beforeOrAfter: string = "after"
  ) {
    if (message === null) {
      message = new CodeMessage("Some code here " + Math.random());
    }
    const cell = new NotebookCell(this.model, message, "input");
    this.model.addCell(cell, cellId, beforeOrAfter);
    this.emit("new-cell", cell);
  }
  public addOutputCell(
    message: Message | null = null,
    cellId: string | null = null
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
        `This is the output of input ${inputCell.index} at ${time}.`
      );
    }
    const cell = new NotebookCell(
      this.model,
      message,
      "output",
      inputCell.id.toString()
    );
    cell.inputCellId = inputCell.id;
    this.model.addCell(cell, cellId, "after");
    this.emit("new-cell", cell);
  }
  public get cells() {
    return this.model.cells;
  }
  public setFocus(id: string | null) {
    this.focusId = id;
    this.emit("focus", id);
  }
  public deleteCell(id: string) {
    this.model.deleteInput(id);
    this.emit("delete-cell", id);
  }
}
