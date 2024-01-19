<template>
  <div :class="{ 'bg-gray-400': hasHighlight }">
    <div
      v-if="cell.direction === 'input'"
      @click="setFocus()"
      class="w-full my-2"
    >
      <div class="flex">
        <div v-if="executionId">
          <div class="my-2 text-gray-500 ml-1 w-max min-w-20">
            [{{ executionId }}]
          </div>
        </div>
        <div v-else>
          <div class="my-2 text-gray-500 w-max min-w-20">[ ]</div>
        </div>
        <div
          class="border-l-4 w-full p-2 dark:bg-[#333] bg-gray-100"
          :class="{
            'border-l-gray-500': !props.hasFocus,
            'border-l-green-500': props.hasFocus,
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
      <div class="flex" v-if="hasFocus">
        <div class="my-0 m-15 text-gray-500 w-max min-w-20">&nbsp;</div>
        <div class="w-full dark:bg-[#666] bg-gray-200">
          <div class="grid grid-cols-10">
            <div class="ml-3">Image</div>
            <div class="ml-3">Ad</div>
            <div class="col-start-11 m-1">
              <svg
                @click="deleteCell()"
                style="cursor: pointer"
                title="Delete cell"
                fill="#000000"
                width="12px"
                height="12px"
                viewBox="-2.94 0 31.716 31.716"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <g transform="translate(-355.957 -579)">
                    <path
                      d="M376.515,610.716H361.231a2.361,2.361,0,0,1-2.358-2.359V584.1a1,1,0,0,1,2,0v24.255a.36.36,0,0,0,.358.359h15.284a.36.36,0,0,0,.358-.359V584.1a1,1,0,0,1,2,0v24.255A2.361,2.361,0,0,1,376.515,610.716Z"
                    ></path>
                    <path
                      d="M365.457,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,365.457,604.917Z"
                    ></path>
                    <path
                      d="M372.29,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,372.29,604.917Z"
                    ></path>
                    <path
                      d="M380.79,585.1H356.957a1,1,0,0,1,0-2H380.79a1,1,0,0,1,0,2Z"
                    ></path>
                    <path
                      d="M372.79,581h-7.917a1,1,0,1,1,0-2h7.917a1,1,0,0,1,0,2Z"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div style="display: flex">
       <template v-if="props.controller.view==='default'">
        <div v-if="executionId">
          <div class="w-max min-w-20 my-2 ml-1 text-gray-500">
            [{{ executionId }}]
          </div>
        </div>
        <div v-else>
          <div class="w-max min-w-20 my-2 text-gray-500">[ ]</div>
        </div>
       </template>
        <div class="cell-output">
          <div v-if="props.cell.message.typeName == 'CodeMessage'">
            <CodeMessageRendering
              :message="props.cell.message"
              direction="output"
            />
          </div>
          <div v-if="props.cell.message.typeName == 'TextMessage'">
            <TextMessageRendering
              :message="props.cell.message"
              direction="output"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, toRef } from "vue";
import { NotebookCell } from "@orbifold/entities";
import CodeMessageRendering from "./CodeMessageRendering.vue";
import TextMessageRendering from "./TextMessageRendering.vue";
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
  hasHighlight: {
    type: Boolean,
    required: false,
  },
});
const executionId = computed(() => {
  return props.cell.executionId;
});
const hasHighlight = toRef(props.hasHighlight);
// watch(
//     ()=>props.cell,
//     (newVal) => {
//       executionId.value = newVal.executionId||"";
//     },
//     { immediate: true, deep: true }
//   );

onMounted(() => {
  // hasFocus.value = props.cell.hasFocus;
});

function setFocus() {
  // hasFocus.value = true;
  props.controller.setFocus(props.cell.message.id);
}

function deleteCell() {
  props.controller.deleteCell(props.cell.message.id);
}
</script>
