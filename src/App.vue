<template>
  <div class="w-full bg-gray-300 dark:bg-[#333]">
    <button @click="addCell()">Add cell</button>
    <button @click="toggleTheme()">Toggle Theme</button>
    <button @click="toggleView()">Toggle View</button>
  </div>

  <div class="flex justify-center items-center w-screen h-screen">
    <div
      class="border-2 border-gray-200 dark:border-[#333] rounded w-11/12 h-5/6 md:w-9/12 md:h-5/6 overflow-y-auto p-3"
    >
      <Notebook ref="nb" />
    </div>
  </div>
</template>
<script setup lang="ts">
// import Notebook from "@/components/Notebook.vue";
import { Message, MarkdownMessage, CodeMessage } from "@orbifold/entities";
import { onMounted, ref } from "vue";
import _ from "lodash";
import MarkdownMessageRendering from "./components/rendering/MarkdownMessageRendering.vue";
const nb = ref(null);
let notebook: any | null = null;
onMounted(() => {
  notebook = nb.value;
  window["nb"] = notebook;
  createStuff();
});

function addCell() {
  if (notebook) {
    notebook.addCell(
      new MarkdownMessage("# Aah"),
      null,
      "after",
      _.sample([1, 2, 3, 4])
    );
  }
}
function toggleTheme() {
  document.body.classList.toggle("dark");
}
function toggleView() {
  if (notebook) {
    notebook.setView(
      notebook.getView() === "default" ? "dashboard" : "default"
    );
  }
}
function createStuff() {
  // _.range(_.random(1, 10)).forEach((i) => {
  //   addCell();
  // });
  // setTimeout(() => {
  //   const cellId = _.sample(notebook.getInputCellIds());
  //   notebook.executeCell(cellId);
  // }, 1000 + Math.random() * 2000);
  const a=notebook.addCell(new CodeMessage("Q.data()"));
  const b = notebook.addCell(new CodeMessage("Q.chart()"));
  notebook.executeCell(a.id);
  notebook.executeCell(b.id);
}
</script>
