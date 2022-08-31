# BFS 与 DFS

面试当中被问到了这个问题，然后当时也是一个紧张直接忘了七七八八。唉，亏得一批。万万也没想到问了一个堆排序，这个我是真忘得一干二净，学习 ing
以下都是我个人认为最容易理解的版本。

DFS（深度优先）

```js
// 递归实现
function dfsDG(root) {
  const res = [];
  if (!root) return res;
  const dfs = (root) => {
    if (root) {
      res.push(root.val);
      dfs(root.left);
      dfs(root.fight);
    }
  };
  dfs(root);
  return res;
}

// 非递归实现
function dfsStack(root) {
  const res = [];
  const stack = [root];
  while (stack.length) {
    let node = stack.pop();
    res.push(node.val);
    // 这里right和left是不能互换位置的，node是栈的最上面的元素，
    // 所以应该先让右子树进，这样才能保证取到的是左子树的节点开始
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }
  return res;
}
// 相当于是二叉树的前序遍历 所以有
function preOrder(root) {
  const res = [];
  const stack = [root];
  while (stack.length || root) {
    while (root) {
      res.push(root.val);
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    root = root.right;
  }
  return res;
}
```

接下来是 BFS（广度优先）
广度优先也就是层次遍历，一层一层的遍历

```js
// 递归实现
function bfsDG(root) {
  const res = [];
  if (!root) return res;
  const bfs = (root, level) => {
    if (!root) return null;
    if (!res[level]) res[level] = [];
    res[level].push(root.val);
    bfs(root.left, level + 1);
    bfs(root.right, level + 1);
  };
  return res;
}

// 非递归实现
function bfsStack(root) {
  const res = [];
  const queue = [root];
  const p = 0; // 此处定义一个指针
  while (p < queue.length) {
    let node = queue[p++];
    res.push(node.val);
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return res;
}
```

以上就是我自己对这两个算法的一个小总结
