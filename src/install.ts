import type { App } from "vue";
import NotebookView from "./components/NotebookView.vue";

export default {
  install: (app: App) => {
    app.component("Notebook", NotebookView);
  },
};

export { NotebookView };
