<template>
	<apexchart v-if="props.renderType=== 'bar'"
		type="bar"
		:options="chartOptions"
		:series="series"
		height="300"
	></apexchart>
	<apexchart v-if="props.renderType=== 'line'"
		type="line"
		:options="chartOptions"
		:series="series"
		height="300"
	></apexchart>
	<apexchart v-if="props.renderType=== 'area'"
		type="area"
		:options="chartOptions"
		:series="series"
		height="300"
	></apexchart>
</template>
<script setup lang="ts">
	import { defineProps, computed } from "vue";
	const props = defineProps({
		data: {
			type: Array,
			default: [],
		},
		renderOptions: {
			type: Object,
			default: {},
		},
		renderType: {
			type: String,
			default: "bar",
		},
	});
	const renderType = computed(() => {
		return props.renderType;
	});
	const series = [
		{
			name: "series-1",
			data:props.data,
		},
	];
	const chartOptions = _.assign({
		chart: {
			id: "qwiery-chart",
		},

	}, props.renderOptions);
</script>
