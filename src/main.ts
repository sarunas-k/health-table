import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

declare module 'vue' {
    interface ComponentCustomProperties {
      rootPath?: string;
      assetsPath?: string;
      iconsPath?: string;
    }
}

app.config.globalProperties.rootPath = 'http://localhost:5173';
app.config.globalProperties.assetsPath = 'http://localhost:5173/assets';
app.config.globalProperties.iconsPath = 'http://localhost:5173/assets/icons';

app.use(createPinia())

app.mount('#app')
