# 手写一个 promise 以及.then

想要学会一个东西，那就去实现它。name 要学会 promise，那就去实现一个 promise。没毛病吧，那么接下来我们就来实现一个 myPromise。

首先我们知道 promise 有三种状态以及返回结果，所以有

```js
class myPromise {
  constructor() {
    this.state = "pending";
    this.result = null;
  }
  resolve(val) {
    this.state = "onFullfilled";
    this.result = val;
  }
  reject(val) {
    this.state = "rejectd";
    this.result = val;
  }
}
```

然后promsie箭头函数有两个方法，接收值，并且状态只能改变一次

```js
class myPromise {
  constructor(ext) {
    this.state = "pending";
    this.result = null;
    ext(this.resolve, this.reject);
  }
  resolve(val) {
    if (this.state !== "pending") return;
    this.state = "onFullfilled";
    this.result = val;
  }
  reject(val) {
    if (this.state !== "pending") return;
    this.state = "rejectd";
    this.result = val;
  }
}
```

但是此时问题来了，首先是 this 指向问题，因为是方法传过来的所以访问会出现 this 值为 undefined 的情况,所以需要修改 this 的指向

```js
class myPromise {
  constructor(ext) {
    this.state = "pending";
    this.result = null;
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    ext(this.resolve, this.reject);
  }
  resolve(val) {
    if (this.state !== "pending") return;
    this.state = "onFullfilled";
    this.result = val;
  }
  reject(val) {
    if (this.state !== "pending") return;
    this.state = "rejectd";
    this.result = val;
  }
}
```

此时 constructor 的当中就会显的比较冗余，所以对此进行一个简单的封装操作。如下

```js
class myPromise {
  constructor(ext) {
    this.initVal();
    this.initBind();
    ext(this.resolve, this.reject);
  }
  initVal() {
    this.state = "pending";
    this.result = null;
  }
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  resolve(val) {
    if (this.state !== "pending") return;
    this.state = "onFullfilled";
    this.result = val;
  }
  reject(val) {
    if (this.state !== "pending") return;
    this.state = "rejectd";
    this.result = val;
  }
}
```

此时一个简单的 promise 就封装好了，来看一下效果吧

```js
let myPro = new myPromise((resolve, reject) => {
  resolve(1);
});
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dca0cbf93e4422880b8f209b1b624d5~tplv-k3u1fbpfcp-watermark.image?)
name 想要获取 myPromise 的返回值需要怎么办呢？此时需要在封装一个.then 方法，如下：

```js
myPromise.prototype.then = function (onFullfilled, onReject) {
  // 先判断是否是一个函数
  onFullfilled =
    typeof onFullfilled === "function" ? onFullfilled : (val) => val;
  onRejectd =
    typeof onFullfilled === "function"
      ? onFullfilled
      : (reason) => {
          throw reason;
        };
  // 在这里面的this是调用的myPromise对象，所以可以获取到这个myPromise的所有属性,可以参考上图
  if (this.state === "onFullfilled") {
    onFullfilled(this.result);
  } else {
    onRejectd(this.result);
  }
};
```

此时就可以获取到 myPromise 想要返回的值了，如下图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30c04207bd0e48c8b2bc308bf2bbdd00~tplv-k3u1fbpfcp-watermark.image?)

但是有个问题，只能执行一次.then 操作，后续会报错。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/264e93e2b6e64c7fadbeec0dc5a5fbb2~tplv-k3u1fbpfcp-watermark.image?)
如果想要实现链式调用，非常简单，只需要在.then 当中添加一行代码即可。但是真正的 promise 对象仅第一次会拿到返回值，接下来的.then 拿到的都是 undefined，所以还需在添加一句代码，将 this.result 赋值为 undefined 即可。

```js
myPromise.prototype.then = function (onFullfilled, onRejectd) {
  onFullfilled =
    typeof onFullfilled === "function" ? onFullfilled : (val) => val;
  onRejectd =
    typeof onRejectd === "function"
      ? onRejectd
      : (reason) => {
          throw reason;
        };

  if (this.state === "fullfilled") {
    onFullfilled(this.result);
  } else if (this.state === "rejectd") {
    onRejectd(this.result);
  }
  this.result = undefined;
  return this;
};
```

靓仔靓女，代码到这里也就结束了，如果感觉有点收获的话，就给个赞吧~
