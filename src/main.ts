import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import Notebooks from './install'
import run from "~/components/icons/run.vue";
import expand from "~/components/icons/expand.vue";
import shrink from "~/components/icons/shrink.vue";
import bin from "~/components/icons/bin.vue";
import gear from "~/components/icons/gear.vue";
import add from "~/components/icons/add.vue";
import theme from "~/components/icons/theme.vue";
import sweep from "~/components/icons/sweep.vue";
import eye from "~/components/icons/eye.vue";

const app = createApp(App)
app.use(Notebooks)
app.component('icon-run',run)
app.component('icon-expand',expand)
app.component('icon-shrink',shrink)
app.component('icon-bin',bin)
app.component('icon-gear',gear)
app.component('icon-add',add)
app.component('icon-theme',theme)
app.component('icon-sweep',sweep)
app.component('icon-eye',eye)
app.mount('#app')
