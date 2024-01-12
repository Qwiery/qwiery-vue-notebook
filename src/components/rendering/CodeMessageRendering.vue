<template>
  <input
    type="text"
    :value="props.message.code"
    class="!w-[100%] bg-transparent dark:text-white/50 font-mono outline-none"
    @keydown="keydown($event)"
  />
</template>
<script setup lang="ts">
import { CodeMessage } from "@orbifold/entities";
import { NotebookController } from "../NotebookController";

function keydown(event: KeyboardEvent) {
  if (event.key === "a" && event.ctrlKey) {
    props.controller.addInputCell(null, props.message.id, "after");
  }else if(event.key === "Enter" && event.shiftKey){
    props.controller.addOutputCell(null, props.message.id);
  }
}
const props = defineProps({
  message: {
    type: CodeMessage,
    required: true,
  },
  controller: {
    type: NotebookController,
    required: true,
  },
});
</script>
