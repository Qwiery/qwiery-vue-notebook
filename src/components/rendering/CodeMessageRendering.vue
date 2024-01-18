<template>
  <input v-if="props.direction === 'input'"
    type="text"
    :value="props.message.code"
    class="!w-[100%] bg-transparent dark:text-white/50 font-mono outline-none"
    @keydown="keydown($event)"
  />
  <div v-else>
    <div class="my-2">
      <code class="text-emerald-500">{{ props.message.code }}</code>
    </div>
  </div>  
</template>
<script setup lang="ts">
import { CodeMessage } from "@orbifold/entities";
import { NotebookController } from "../NotebookController";

function keydown(event: KeyboardEvent) {
  if (event.key === "a" && event.ctrlKey) {
    props.controller.addInputCell(null, props.message.id, "after");
  }else if(event.key === "Enter" && event.shiftKey){
    props.controller.addOutputCell(CodeMessage.fromString("console.log(23)"), props.message.id);
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
