<template>
  <div class="w-full bg-gray-300 dark:bg-[#333]">
    <button @click="addCell()" >Add cell</button>
    <button @click="toggleTheme()" >Toggle Theme</button>
  </div>
  <div style="position: absolute; top: 200px; left: 200px; width: 900px">
    <Notebook ref="nb" />
  </div>
</template>
<script setup lang="ts">
// import Notebook from "@/components/Notebook.vue";
import { Message } from "@orbifold/entities";
import { onMounted, ref } from "vue";
const nb = ref(null);
let notebook: any | null = null;
onMounted(() => {
  notebook = nb.value;
  window["nb"] = notebook;
});

function addCell( message: Message | null = null,
    cellId: string | null = null,
    beforeOrAfter: string = "after") {
  if (notebook) {
    notebook.addCell();
  }
}
function toggleTheme() {
  document.body.classList.toggle("dark");
} 
</script>
