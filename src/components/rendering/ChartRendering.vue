<template>
	<apexchart
		type="bar"
		:options="chartOptions"
		:series="series"
	></apexchart>
</template>
<script setup lang="ts">
	const props = defineProps({
		data: {
			type: Array,
			default: [],
		},
		renderOptions: {
			type: Object,
			default: {},
		},
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
	console.log(chartOptions);
</script>
