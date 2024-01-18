import { createApp } from 'vue'
import App from './App.vue'
import Terminal from './install'
const app = createApp(App)
app.use(Terminal)
app.mount('#app')
