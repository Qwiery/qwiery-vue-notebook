<template>
	<div  class="cell-input">
        {{props.cell.message.code}}
    </div>
</template>
<script setup lang="ts">
import {onMounted} from 'vue'
import { NotebookCell } from '@orbifold/entities';
const props = defineProps({
    cell: {
        type: NotebookCell,
        required: true
    }
})
onMounted(() => {
  
})
</script>