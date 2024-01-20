<template>
  <input v-if="props.direction === 'input'"
    type="text"
    :value="props.message.text"
    class="input-text"
    @keydown="keydown($event)"
  />
  <div v-else>
    <p class="text-blue-600 my-2">{{ props.message.text }}</p>
  </div>
</template>
<script setup lang="ts">
import { TextMessage } from "@orbifold/entities";
import { NotebookController } from "~/components/NotebookController";

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
  direction:{
    type: String,
    required: false,
    default: "input"
  }
});
</script>
