 
import { describe, test, it, expect } from "vitest";
import { ErrorMessage, Message } from "@orbifold/entities";
import { NotebookController } from "../src/components/NotebookController";
describe("NotebookController", () => {
  it("should get events", async () => {
    const controller = new NotebookController();
    controller.on("new-cell", (cell) => {
      expect(cell).toBeDefined();
      expect(cell.id).toBeDefined();
      expect(cell.message).toBeDefined();
      expect(cell.message.typeName).toBe("CodeMessage");
    });
    controller.addInputCell();
    
  });
});
