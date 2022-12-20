import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"), // 主页
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("../views/Blog.vue"), // 博客

  },
  {
    path: "/write",
    name: "write",
    component: () => import("../views/Write.vue"), // 写博客
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
