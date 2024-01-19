<template>
  <div>
    <div v-for="cell in cells" :key="cell.executionId">
      <NotebookCellRendering
        :cell="cell"
        :controller="controller"
        :hasFocus="cell.hasFocus"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { NotebookController } from "./NotebookController";
import NotebookCellRendering from "./rendering/NotebookCellRendering.vue";
import "../assets/style.css";
import { Message, NotebookCell } from "@orbifold/entities";
// MVC logic
const controller: NotebookController = new NotebookController();
const cells: NotebookCell[] = ref([]);

/**
 * Re-renders the notebook.
 */
function refreshAll() {
  cells.value = [];
  cells.value = controller.cells;
}

onMounted(() => {
  controller.on("new-cell", refreshAll);
  controller.on("focus", setFocus);
  controller.on("delete-cell", refreshAll);
  controller.on("cellId", refreshAll);
});

/**
 * Adds a cell to the notebook.
 */
function addCell(
  message: Message | null = null,
  cellId: string | null = null,
  beforeOrAfter: string = "after"
) {
  controller.addCell(message, cellId, beforeOrAfter);
}

function setFocus(cellId) {
  controller.cells.forEach((cell) => {
    if (cell.message.id === cellId) {
      cell.hasFocus = true;
    } else {
      cell.hasFocus = false;
    }
  });
  refreshAll();
}
function setExecutionId(messageId, cellId) {
  controller.setExecutionId(messageId, cellId);
}
function getCellIds() {
  return controller.getCellIds();
}
function getExecutionIds() {
  return controller.getExecutionIds();
}
/**
 * Expose the functions to the outside world.
 */
defineExpose({
  addCell,
  refreshAll,
  getCellIds,
  getExecutionIds,
  setExecutionId
});
</script>
