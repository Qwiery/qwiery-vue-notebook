<template>
	<div v-if="props.direction === 'input'">
		<p class="text-red-500">Data input is not supported.</p>
	</div>
	<div v-else>
		<div class="my-2 w-full">
			<template v-if="isGrid">
				<vue3-datatable

					:rows="rows"
					:columns="cols"
					:loading="loading"
					:sortable="true"
					:columnFilter="false"
				>
				</vue3-datatable>
			</template>
			<template v-if="!isGrid">
				<div class="w-full h-full">
					<ChartRendering :data="message.data" :renderOptions="message.renderOptions" :renderType="message.renderType"></ChartRendering>
				</div>
			</template>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { DataMessage } from "@orbifold/entities";
	import { NotebookController } from "~/components/NotebookController";
	import { onMounted, ref, computed } from "vue";
	import Vue3Datatable from "@bhplugin/vue3-datatable";
	import _ from "lodash";
	import "@bhplugin/vue3-datatable/dist/style.css";
	import ChartRendering from "~/components/rendering/ChartRendering.vue";

	onMounted(() => {
		getUsers();

	});
	const loading: any = ref(true);
	const rows: any = ref(null);
	const cols =
		ref([
			{ field: "id", title: "ID", isUnique: true },
			{ field: "firstName", title: "First Name" },
			{ field: "age", title: "Age" },
		]) || [];

	const getUsers = async () => {
		try {
			loading.value = true;
			await new Promise((r) => setTimeout(r, 1200));
			rows.value = [
				{ id: 1, firstName: "John", age: 3245 },
				{ id: 2, firstName: "Jane", age: 3245 },
				{ id: 3, firstName: "Joe", age: 3245 },
			];
		} catch {
		}

		loading.value = false;
	};
	const isGrid = computed(() => {
		return props.message.renderType === "data";
	});

	const props = defineProps({
		message: {
			type: DataMessage,
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

</script>
