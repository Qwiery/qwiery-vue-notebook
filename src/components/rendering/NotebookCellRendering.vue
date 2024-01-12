<template>
  <div v-if="cell.direction === 'input'" @click="setFocus()">
    <div class="flex my-2">
      <div v-if="cell.index.length > 0" style="width: 55px">
        <div style="margin: 10px 5px 0 0; color: silver; width: max-content">
          [In {{ cell.index }}]
        </div>
      </div>
      <div
        class="border-l-4 w-[100%] p-2 dark:bg-[#333]"
        :class="{
          'border-l-gray-500': ! props.hasFocus,
          'border-l-green-500':  props.hasFocus,
        }"
      >
        <div v-if="props.cell.message.typeName == 'CodeMessage'">
          <CodeMessageRendering
            :message="props.cell.message"
            :controller="props.controller"
          />
        </div>
      </div>
    </div>
    <div class="flex w-full bg-gray-200 ml-[52px]" v-if="hasFocus">
      <div class="ml-3">Image</div>
    </div>
  </div>
  <div v-else>
    <div style="display: flex">
      <div v-if="cell.index.length > 0" style="width: 55px">
        <div style="margin: 18px 5px 0 0; color: silver; width: max-content">
          [Out {{ cell.index }}]
        </div>
      </div>
      <div class="cell-output">
        <div v-if="props.cell.message.typeName == 'CodeMessage'">
          <code>{{ props.cell.message.code }}</code>
        </div>
        <div v-if="props.cell.message.typeName == 'TextMessage'">
          <p style="color: limegreen">{{ props.cell.message.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { NotebookCell } from "@orbifold/entities";
import CodeMessageRendering from "./CodeMessageRendering.vue";
import { NotebookController } from "../NotebookController";
// const hasFocus = computed(() => {
//   return props.cell.hasFocus;
// })
const props = defineProps({
  cell: {
    type: NotebookCell,
    required: true,
  },
  controller: {
    type: NotebookController,
    required: true,
  },
  hasFocus: {
    type: Boolean,
    required: false,
  },
});
onMounted(() => {
  // hasFocus.value = props.cell.hasFocus;
});
function setFocus() {
  // hasFocus.value = true;
  props.controller.setFocus(props.cell.message.id);
}
</script>
