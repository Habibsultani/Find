import { createApp } from 'vue';
import { defineAsyncComponent } from 'vue';

import router from './router.js';
import App from './App.vue';
import store from './store/index.js';
import BaseCard from './component/ui/BaseCard.vue';
import BaseButton from './component/ui/BaseButton.vue';
import BaseBadge from './component/ui/BaseBadge.vue';
import BaseSpinner from './component/ui/BaseSpinner.vue';
// import BaseDialog from './component/ui/BaseDialog.vue';

const BaseDialog = defineAsyncComponent(() =>
  import('./component/ui/BaseDialog.vue')
);

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
