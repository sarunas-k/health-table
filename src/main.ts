import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useTableStore } from './stores/tableStore'
import Loader from './load'

const app = createApp(App)

declare module 'vue' {
    interface ComponentCustomProperties {
      rootPath?: string;
      assetsPath?: string;
      iconsPath?: string;
    }
}

app.config.globalProperties.rootPath = '/';
app.config.globalProperties.assetsPath = './assets';
app.config.globalProperties.iconsPath = './assets/icons';

app.use(createPinia())

app.mount('#app')

new Loader(useTableStore()).load('./health-db/db.json');