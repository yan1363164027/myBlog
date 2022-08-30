import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/icons/index";
import SvgIcon from "./components/SvgIcon.vue";

createApp(App).use(router).component("svg-icon", SvgIcon).mount("#app");
