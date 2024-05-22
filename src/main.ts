import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App, { tblLoader } from './App.vue'
import type { IUserStore } from './models/types/HealthTableTypes.mjs'
import HealthTableLoader from './load'
import { useTableStore } from './stores/tableStore'

const app = createApp(App)

app.config.globalProperties.rootPath = '/';
app.config.globalProperties.assetsPath = './assets';
app.config.globalProperties.iconsPath = './assets/icons';

app.use(createPinia())
app.mount('#app')

// Initialize users data and load to store
const store = useTableStore();
tblLoader.value = new HealthTableLoader(store as IUserStore | any);
tblLoader.value.load(1,store.perPage);
