import { createApp } from "vue";
import App from "./App.vue";
import Toast, { PluginOptions } from "vue-toastification";
import router from "./router";
import store from "./store";
import "./main.css";
import "vue-toastification/dist/index.css";

const toastOption: PluginOptions = {};

createApp(App).use(store).use(router).use(Toast, toastOption).mount("#app");
