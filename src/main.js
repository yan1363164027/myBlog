import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/icons/index";
import SvgIcon from "./components/SvgIcon.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mitt from "mitt"
const app = createApp(App)
app.use(router).component("svg-icon", SvgIcon).use(ElementPlus).mount("#app");
app.$mitt = mitt()