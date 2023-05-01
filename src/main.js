import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/icons/index";
import SvgIcon from "./components/SvgIcon.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/assets/css/heightlight.css"; // 代码高亮
import mitt from "mitt"
import store from "./store";
const app = createApp(App)
app.use(router).component("svg-icon", SvgIcon).use(ElementPlus).use(store).mount("#app");
app.$mitt = mitt()