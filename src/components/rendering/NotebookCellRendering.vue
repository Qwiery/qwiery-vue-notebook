<template>
  <div style="display: flex" v-if="cell.direction === 'input'">
    <div v-if="cell.index.length > 0" style="width: 55px">
      <div style="margin: 18px 5px 0 0; color: silver; width: max-content">
        [In {{ cell.index }}]
      </div>
    </div>
    <div class="cell-input">
      <div v-if="props.cell.message.typeName == 'CodeMessage'">
        <CodeMessageRendering
          :message="props.cell.message"
          :controller="props.controller"
        />
      </div>
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
          <p style="color: limegreen">{{ props.cell.message.text  }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { NotebookCell } from "@orbifold/entities";
import CodeMessageRendering from "./CodeMessageRendering.vue";
import { NotebookController } from "../NotebookController";

const props = defineProps({
  cell: {
    type: NotebookCell,
    required: true,
  },
  controller: {
    type: NotebookController,
    required: true,
  },
});
onMounted(() => {});
</script>
