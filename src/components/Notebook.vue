<template>
  <div>
    <div v-for="cell in cells" :key="cell.message.id">
        <NotebookCellRendering :cell="cell" :controller="controller" />
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
  cells.value=controller.cells
  
}

onMounted(() => {
  controller.on("new-cell", refreshAll);
});
function addCell() {
  controller.addInputCell();
}
defineExpose({
  addCell,
});
</script>
