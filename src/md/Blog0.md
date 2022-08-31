字节青训营，主观论述题，写完发现自己这一块学的是真的拉胯，要补习啊。
代码以及详解如下：

```js
// 宏任务是队列，先进先出 整个代码先进入（两个方法体进入）

/* 有reslove 不被setTimeout包裹时，
        代码顺序执行遇到new Promise，执行里面的代码（同步）
        reslove(1) 扔进微任务队列
        setTimeout(() => {console.log(2)}); 扔进宏任务队列
3       同步执行 console.log(3);
1       方法一执行完毕 执行微任务队列reslove(1) console.log(1)
        由于方法体二进入宏任务早于 方法体一当中的 setTimeout(() => {console.log(2)});
        所以先执行另一个方法体
        reslove(4) 扔进微任务队列
        setTimeout(() => {console.log(5)}); 扔进宏任务队列 
6       同步执行 console.log(6);
4       方法二执行完毕 执行微任务队列reslove(4) console.log(4)
        此时宏任务两个方法体完毕继续执行后续代码
2       setTimeout(() => {console.log(2)});
5       setTimeout(() => {console.log(5)});
      */

document.body.addEventListener(
  "click",
  () => {
    new Promise((reslove) => {
      reslove(1);
    }).then((res) => {
      console.log(res);
    });
    setTimeout(() => {
      console.log(2);
    });
    console.log(3);
  },
  false
);
document.body.addEventListener(
  "click",
  () => {
    new Promise((reslove) => {
      reslove(4);
    }).then((res) => {
      console.log(res);
    });
    setTimeout(() => {
      console.log(5);
    });
    console.log(6);
  },
  false
);

/*  有reslove 被setTimeout包裹时
      遇到new Promise((reslove) => { setTimeout(() => {reslove(1)});
      进入new promise，发现是一个setTimeout扔进宏任务队列
      setTimeout(() => {console.log(2)}); 扔进宏任务队列
3     然后console.log(3);
      方法体一执行完发现微任务队列为空        
      由于方法体二进入宏任务早于 方法体一里new Promise当中的 setTimeout(() => {console.log(1)});
      所以先执行另一个方法体
      进入new promise，发现是一个setTimeout(()=>{reslove(4);})扔进宏任务队列
      setTimeout(() => {console.log(5)}); 扔进宏任务队列
6     console.log(6)
      两个方法体执行完毕，继续执行代码
      方法体一扔进宏任务当中的
      setTimeout(() => {
        reslove(1);
1     }).then((res) => console.log(res) ); 
      setTimeout(() => {
2       console.log(2);
      });
      方法体二扔进宏任务当中的
      setTimeout(() => {
        reslove(4);
4     }).then((res) => console.log(res) ); 
      setTimeout(() => {
5       console.log(5);
      });
      */
document.body.addEventListener(
  "click",
  () => {
    new Promise((reslove) => {
      setTimeout(() => {
        reslove(1);
      });
    }).then((res) => {
      console.log(res);
    });
    setTimeout(() => {
      console.log(2);
    });
    console.log(3);
  },
  false
);
document.body.addEventListener(
  "click",
  () => {
    new Promise((reslove) => {
      setTimeout(() => {
        reslove(4);
      });
    }).then((res) => {
      console.log(res);
    });
    setTimeout(() => {
      console.log(5);
    });
    console.log(6);
  },
  false
);
```
