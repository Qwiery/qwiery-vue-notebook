<template>
  <textarea
    v-if="props.direction === 'input'"
    :value="props.message.code"
    class="input-text p-3 bg-transparent w-full h-full outline-none min-h-10"
    @keydown="keydown($event)"
    @keyup="keyup($event)">
  </textarea>
  <div v-else>
    <div class="my-2 w-full">
      <pre class="text-gray-700 dark:text-gray-500">{{ props.message.code }}</pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CodeMessage } from "@orbifold/entities";
import { NotebookController } from "~/components/NotebookController";
function keyup(event: KeyboardEvent) {
  props.message.code = (<HTMLTextAreaElement>event.target).value;
}
function keydown(event: KeyboardEvent) {
  if (event.key === "a" && event.ctrlKey) {
    props.controller.addInputCell(null, props.message.id, "after");
  }else if(event.key === "Enter" && event.shiftKey){
    props.controller.executeCell(props.message);
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
  direction:{
    type: String,
    required: false,
    default: "input"
  }
});
</script>
