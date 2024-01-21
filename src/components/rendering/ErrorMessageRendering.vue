<template>
	<template v-if="props.direction === 'input'">
		<p>The ErrorMessage does not have an input mode.</p>
	</template>
  <template v-else>
    <p class="text-red-600 my-2">{{ props.message.error }}</p>
  </template>
</template>
<script setup lang="ts">
import { ErrorMessage } from "@orbifold/entities";
import { NotebookController } from "~/components/NotebookController";


const props = defineProps({
  message: {
    type: ErrorMessage,
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
