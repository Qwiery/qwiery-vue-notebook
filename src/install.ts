import type { App } from "vue";
// @ts-ignore
import NotebookView from "/src/components/NotebookView.vue";
import VueApexCharts from "vue3-apexcharts";
export default {
  install: (app: App) => {
    app.use(VueApexCharts);
    app.component("Notebook", NotebookView);
  },
};

export { NotebookView };
