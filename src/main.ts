import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "@/styles/styles.scss";

createApp(App).use(createPinia()).mount("#app");
