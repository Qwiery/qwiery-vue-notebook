import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import Notebooks from './install'

const app = createApp(App)
app.use(Notebooks)

app.mount('#app')
