import eventemitter3 from "eventemitter3";
import {
  Message,
  Notebook,
  CodeMessage,
  NotebookCell,
} from "@orbifold/entities";
export class NotebookController extends eventemitter3 {
  public model: Notebook = new Notebook();
  public counter: number = 0;

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
    const cell = new NotebookCell(
      this.model,
      message,
      "input",
      this.counter.toString(),
      message.id
    );
    this.model.addCell(cell, cellId, beforeOrAfter);
    this.emit("new-cell", cell);
  }
  public get cells() {
    return this.model.cells;
  }
}
