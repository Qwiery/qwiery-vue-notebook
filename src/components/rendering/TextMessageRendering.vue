<template>
  <input
    type="text"
    :value="props.message.text"
    class="input-text"
    @keydown="keydown($event)"
  />
</template>
<script setup lang="ts">
import { TextMessage } from "@orbifold/entities";
import { NotebookController } from "../NotebookController";

function keydown(event: KeyboardEvent) {
  if (event.key === "a" && event.ctrlKey) {
    props.controller.addInputCell(null, props.message.id, "after");
  }else if(event.key === "enter" && event.shiftKey){
    props.controller.addOutputCell(null, props.message.id );
  }
}
const props = defineProps({
  message: {
    type: TextMessage,
    required: true,
  },
  controller: {
    type: NotebookController,
    required: true,
  },
});
</script>
