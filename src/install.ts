import type { App } from "vue";
import Notebook from "./components/Notebook.vue";

export default {
  install: (app: App) => {
    app.component("Notebook", Notebook);
  },
};

export { Notebook };
