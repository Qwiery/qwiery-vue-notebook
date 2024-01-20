<template>
  <div v-if="props.direction === 'input'">
    <p class="text-red-500">Data input is not supported.</p>
  </div>
  <div v-else>
    <div class="my-2 w-full">
      <template v-if="props.message.renderType === 'data'">
        <vue3-datatable
          v-if="renderChart"
          :rows="rows"
          :columns="cols"
          :loading="loading"
          :sortable="true"
          :columnFilter="false"
        >
        </vue3-datatable>
      </template>
      <template v-if="props.message.renderType === 'chart'">
        <div class="w-full h-full">
          <apexchart
            v-if="renderChart"
            type="bar"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CodeMessage } from "@orbifold/entities";
import { NotebookController } from "~/components/NotebookController";
import { onMounted, ref } from "vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import _ from "lodash";
import "@bhplugin/vue3-datatable/dist/style.css";
onMounted(() => {
  getUsers();
  setTimeout(() => {
    renderChart.value = true;
  }, 500);
});
const renderChart = ref(false);
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
  } catch {}

  loading.value = false;
};

const series = [
  {
    name: "series-1",
    data: [30, 40, 35, 50, 49, 60, 70, 91],
  },
];
const chartOptions = {
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};

const props = defineProps({
  message: {
    type: CodeMessage,
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
// debugger;

</script>
