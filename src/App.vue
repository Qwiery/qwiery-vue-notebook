<template>
  <div>
    <button @click="addCell()">Add cell</button>
  </div>
  <div style="position: absolute; top: 200px; left: 200px; width: 900px">
    <Notebook ref="nb" />
  </div>
</template>
<script setup lang="ts">
// import Notebook from "@/components/Notebook.vue";
import { onMounted, ref } from "vue";
// import { Notebook } from "@orbifold/entities";
const nb = ref(null);
let notebook: any | null = null;
onMounted(() => {
  notebook = nb.value;
});
function addCell() {
  if (notebook) {
    notebook.addCell();
  }
}
</script>
