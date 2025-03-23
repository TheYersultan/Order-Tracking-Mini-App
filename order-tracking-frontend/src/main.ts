import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Create the Vue app
const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
})

// Use Vuetify
app.use(vuetify);
app.use(router);


app.mount('#app');
