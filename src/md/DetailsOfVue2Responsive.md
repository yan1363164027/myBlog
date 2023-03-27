# Vue2 响应式原理

自己也是有看过很多的文章，当然大部分基本都是一样的，毕竟一说就都是 Object.defineProperty 为每一个对象的 key 添加了 set，get 方法（为什么不是 setter，getter，我愿意，我就写 set，get），然后 get 当中收集依赖，set 当中触发依赖.... 一搜一大堆。

出于好学好吧其实并不是（要不是面试官喜欢问，有几个人愿意看的，反正我不想看，倒。。。），那么回归正题，先来看一下源码吧！在这里，我将会带着各位靓仔靓女一步一步的去实现，而不是一下实现，建议各位靓仔靓女有点耐心哦！！！

```js
// 最初版
function defineReactive(data, key, val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
    },
  });
}
```

这就是一个很简单的封装，对 Object.defineProperty 进行了一次简单的封装，目前没啥功能。
那么后买就是要收集依赖了对吧，用脚趾头想也知道 get 收集依赖，set 触发依赖。
比如说在 template 当中的某个地方使用了 data 当中的属性，大家都知道 data 当中数据都是响应式的，所以当数据变化了，要告诉谁呢？那不就是 template 里面用到了该数据的地方吗，是不是很简单。

收集依赖，emmm...，那首当其冲的你应该会想到数组吧，那这不就来活了

```js
function defineReactive(data, key, val) {
  let dep = []; // 新增
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.push(window.target); // 新增
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      // 新增
      for (let i = 0; i < dep.length; i++) {
        dep[i](newVal, val);
      }
      val = newVal;
    },
  });
}
```

那么有观众就要问了，window.target 是个什么东西呢？诶，咱先不管这个，你就把他想象成一个东西，放到了全局也就是 window 身上，target 就是 window 的一个属性。这个时候可能就有小伙伴坐不住了，你说的不对 XXX，往下看，不要慌

然后，细心的观众就会发现一个问题，这样写不好，有点藕合。俗话说得好，出现问题，那就解决问题。这时候就有聪明的小伙伴提出来了，可以把他封装一下啊，变成一个 Dep 类不就好了。当当当当

```js
export default class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
```

然后呢，再去更改一下之前的代码

```js
function defineReactive(data, key, val) {
  let dep = new Dep(); // 修改
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.depend(); // 修改
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      dep.notify(); // 新增
    },
  });
}
```

那么现在回归正题，window.target 是啥，首先我们要知道，依赖是要去执行响应的 update()方法的，需要有一个东西来帮助我们去做这个事情，对于每一个 data 都会有一个 watcher 去监视他，watcher 是干嘛的呢？监视的，监视完了干啥呢，那不就是更新呗。首先来看一下 watcher 的代码

```js
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    // 执行this.getter()，就可以读取data.a.b.c的内容
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    window.target = this;
    let value = this.getter.call(this.vm, this.vm);
    // 上面这行代码可是精髓所在，this是当前对象的watcher实例，当调用getter方法的时候
    // 也就是读取了这个对象的属性值，那么就会触发Object.defineProperty当中的get方法
    // get当中会触发dep.depend()，你看在此之前是不是将this赋值给了window.target
    // dep.depend()当中需要用到window.target此时如果是响应式对象那么window.target必定是一个watcher实例
    // 那么就会将它添加到dep数组当中，也就是添加了一个watcher实例进去，当数据变化时，调用下面的update方法去执行更新
    // 当依赖收集结束后，将window.target赋值为undefined，是不是就很妙，没看懂的多串一下代码之间的联系
    window.target = undefined;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}
```

看完上面的解释，也不知道各位懂了没有，说白了 window.target 就是一个 watcher 实例，使用方法类似于 temp 的东西，需要 “ 暂存 ”，但是他需要放在全局都可以访问的位置，所以就选择了 window。

正所谓一步通步步通，那接下来就是对 data 实施递归调用，对每一个都侦测一下，这个时候捏，又开始整活了，看着干嘛，封装啊

```js
/**
* Observer类会附加到每一个被侦测的object上。
 * 一旦被附加上，Observer会将object的所有属性转换为getter/setter的
形式
* 来收集属性的依赖，并且当属性发生变化时会通知这些依赖
*/
export class Observer {
  constructor(value) {
    this.value = value;

    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }

  /**
   * walk会将每一个属性都转换成getter/setter的形式来侦测变化
   * 这个方法只有在数据类型为Object时被调用
   */
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}

function defineReactive(data, key, val) {
  // 新增，递归子属性
  if (typeof val === "object") {
    new Observer(val);
  }
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.depend();
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }

      val = newVal;
      dep.notify();
    },
  });
}
```

你就说妙不妙吧？在最后初始化一个 Vue，酱紫就能实现对于对象的响应式处理了

```js
class Vue {
  constructor(options = {}) {
    this.el = options.el;
    this.exp = options.exp;
    this.data = options.data;
    el.innerHTML = this.data[this.exp]; //初始化页面内容
    let observer = new Observer();
    observer.defineReactive(this.data); //监听数据
    new Watcher(this, this.exp, function (val) {
      //创建watcher实例，调用构造函数。
      el.innerHTML = val;
    });
    return this;
  }
}
```

靓仔靓女，你看 observer。添加了 get，set 方法，然后呢，在 Watcher 里面对每一个 data 生成一个 watcher，触发了 get 然后就一个循环收集依赖，结束。
