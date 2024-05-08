import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.config.globalProperties.rootPath = '/';
app.config.globalProperties.assetsPath = './assets';
app.config.globalProperties.iconsPath = './assets/icons';

app.use(createPinia())
app.mount('#app')
