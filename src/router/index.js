import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/Home.vue"), // 个人中心
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search/index.vue"), // 登陆

  },
  {
    path: "/userCenter",
    name: "userCenter",
    component: () => import("../views/UserCenter/UserCenter.vue"), // 登陆

  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginAndRegister/LoginAndRegister.vue"), // 登陆

  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("../views/BlogList/BlogList.vue"), // 博客

  },
  {
    path: "/write",
    name: "write",
    component: () => import("../views/Blog/BlogWrite.vue"), // 写博客
  },
  {
    path: "/blogDetail",
    name: "blogDetail",
    component: () => import("../views/Blog/BlogDetail.vue"), // 博客详情
  },
  {
    path: "/changeBlog",
    name: "changeBlog",
    component: () => import("../views/Blog/BlogChange.vue"), // 修改博客内容
  },
  {
    path: "/*",
    name: "404",
    component: () => import("../views/404.vue"), // 修改博客内容
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
