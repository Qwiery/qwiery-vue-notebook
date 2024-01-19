import type { App } from "vue";
import NotebookView from "./components/NotebookView.vue";
import VueApexCharts from "vue3-apexcharts";
export default {
  install: (app: App) => {
    app.use(VueApexCharts);
    app.component("Notebook", NotebookView);
  },
};

export { NotebookView };
