import { createApp } from 'vue'
import App from './App.vue'
import Notebooks from './install'

const app = createApp(App)
app.use(Notebooks)

app.mount('#app')
