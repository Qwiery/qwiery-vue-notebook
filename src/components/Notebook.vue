<template>
  <div>
    <div v-for="cell in cells" :key="cell.message.id">
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
import { NotebookCell } from "@orbifold/entities";
// MVC logic
const controller: NotebookController = new NotebookController();
const cells: NotebookCell[] = ref([]);
function refreshAll() {
  cells.value = [];
  cells.value = controller.cells;
}

onMounted(() => {
  controller.on("new-cell", refreshAll);
  controller.on("focus", setFocus);
  controller.on("delete-cell", refreshAll);
});
function addCell() {
  controller.addInputCell();
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
defineExpose({
  addCell,
});
</script>
