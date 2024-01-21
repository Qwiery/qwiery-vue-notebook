<template>
  <textarea
    v-if="props.direction === 'input'"
    :value="props.message.text"
    class="input-text p-3 bg-transparent w-full h-full outline-none min-h-40 text-gray-800 dark:text-gray-400"
    @keydown="keydown($event)"
    @keyup="keyup($event)">
  </textarea>

  <div v-else>
    <p class="text-blue-600 my-2" v-html="renderedText"></p>
  </div>
</template>
<script setup lang="ts">
import { MarkdownMessage } from "@orbifold/entities";
import { NotebookController } from "~/components/NotebookController";
import { watch, ref } from "vue";
import MarkdownIt from "markdown-it";

// Initialize the parser with default options
const md = new MarkdownIt();
const renderedText = ref("");
function keydown(event: KeyboardEvent) {
  if (event.key === "Enter" && event.shiftKey) {
    props.controller.executeCell(props.message);
    return false
  }
  return true;
}
function keyup(event: KeyboardEvent) {
  props.message.text = (<HTMLTextAreaElement>event.target).value;
}
const props = defineProps({
  message: {
    type: MarkdownMessage,
    required: true,
  },
  controller: {
    type: NotebookController,
    required: true,
  },
  direction: {
    type: String,
    required: false,
    default: "input",
  },
});
watch(
  () => props.message,
  (newVal) => {
    const result = md.render(props.message.text);
    // console.log("newVal", newVal);
    renderedText.value = result;
  },
  { immediate: true, deep: true }
);
</script>
