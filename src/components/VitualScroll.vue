<template>
    <!-- wrapper可视容器需要设置overflow-y:scroll;才能监听滚动事件，在父组件使用该组件时，需要设置wrapper可视容器的区域范围 -->
    <div
      :class="`wrapper ${wrapperClassName}`"
      @scroll.passive="scrollHandler"
      ref="virtualScroll"
      :style="isDeparment ? `height: ${showDataList.length * itemHeight}px;` : ''"
    >
      <!-- content填充要显示内容以及上下空白占位 -->
      <ul :class="`content ${ulClassName}`" :style="blankFillStyle">
        <li
          :class="`${liClassName}`"
          v-for="(data, index) in showDataList"
          :key="data[nodeKey] + (data?.org_id || '')"
          @click="liClickCallback(data)"
        >
          <!-- 每条数据的内容结构通过插槽的方式让父组件调用该组件时填充进来 -->
          <slot :data="data"></slot>
        </li>
      </ul>
    </div>
  </template>
  <script setup>
  import { ref, onMounted, reactive, computed, nextTick } from "vue";
  const props = defineProps({
    isDeparment: {
      type: Boolean,
      default: false,
    },
    // 一条数据内容的高度
    itemHeight: {
      type: Number,
      default: 0,
      requied: true
    },
    // 源数据列表
    dataList: {
      type: Array,
      default: () => [],
      requied: true
    },
    ulClassName: {
      type: String,
      default: "",
    },
    wrapperClassName: {
      type: String,
      default: "",
    },
    liClassName: {
      type: String,
      default: "",
    },
    // key
    nodeKey: {
      type: String,
      default: "",
      requied: true
    },
    // 动态类名
    dynamicClassName: {
      type: String,
      default: "",
    },
    // li点击方法
    liClickCallback: {
      type: Function,
      default: () => {},
    },
    // 是否向外触发滚动至底事件(scroll-last)
    scrollLastFlag: {
      type: Boolean,
      default: false,
    },
    // 是否向外触发滚动事件(scroll)，会传出滚动的位移
    scrollFlag: {
      type: Boolean,
      default: false,
    },
  });
  // 可视屏幕容积数量
  const screenContainSize = ref(0);
  // 当前可视数据起始位置索引
  const startIndex = ref(0);
  // 滚动事件触发执行的函数
  const scrollFn = ref(null);
  // 保存滚动的位移
  const scrollY = ref(0);
  // 设置virtualScroll对象
  const virtualScroll = ref(null);
  
  function myResize() {
    // 两次取反可取整，上下有多余空间，因此需要加2条数据
    screenContainSize.value =
      ~~(virtualScroll.value.offsetHeight / props.itemHeight) + 5;
  }
  function scrollHandler() {
    // 1.定时器节流方式
    // 定时器节流，因为定时时间是设定死的，无法根据设备屏幕刷新率相匹配；
    // 如果定时时间设置高了，对于高刷新率设备屏幕来说，当滚动速度很快时，这个定时节流就是个累赘，数据处理速率慢，很容易出现白屏现象
    // scrollFn();
    // 2.请求动画帧节流方式
    // 请求动画帧函数是根据设备屏幕的刷新率来设置回调函数执行的时间间隔的，效果上比定时器节流要好很多
    const fps = 60; //屏幕刷新率为60hz
    const interval = parseInt(String(1000 / fps)); //每次的时间间隔
    let then = Date.now();
    // 定义请求动画帧回调函数
    const callback = () => {
      const now = Date.now();
      setstartIndex();
      // 兼容低刷新率设备，如果屏幕刷新率低于30hz，递归执行回调函数
      if (now - then >= interval) {
        then = now;
        window.requestAnimationFrame(callback);
      }
    };
    window.requestAnimationFrame(callback);
  }
  // 设置滚动到具体的位置,delay：过渡时间
  function scrollTo(val, delay = 0) {
    if (delay === 0) {
      virtualScroll.value.scrollTop = val;
      return;
    }
    const ms = Math.ceil(delay / 5);
    const timer = setInterval(() => {
      const scrollTop = virtualScroll.value.scrollTop;
      const speed = Math.ceil((scrollTop - val) / 5);
      virtualScroll.value.scrollTop =
        scrollTop - speed <= val ? val : scrollTop - speed;
      if (virtualScroll.value.scrollTop === val) {
        clearInterval(timer);
      }
    }, ms);
  }
  // 根据滚动的位移计算当前数据起始位置索引
  function setstartIndex() {
    scrollY.value = virtualScroll.value.scrollTop;
    let temp = ~~(scrollY.value / itemHeight);
    let currentIndex = temp > 0 ? temp : 0;
  
    // 如果上一次的startIndex.value与现在的startIndex.value相等，直接返回，无须处理
    if (currentIndex === startIndex.value) return;
    startIndex.value = currentIndex;
    // 滚动至底向外发布事件
  }
  // 当前可视数据结束位置索引
  const endIndex = computed(() => {
    let endIndex = startIndex.value + screenContainSize.value * 2;
    // 如果endIndex位置索引数据不存在，则就等于源数据的长度
    if (!props.dataList[endIndex]) {
      endIndex = props.dataList.length;
    }
    return endIndex;
  });
  // 当前在屏幕上要展示的数据列表
  const showDataList = computed(() => {
    // 屏幕上方留一屏缓冲数据，以消除因向下滚动过快而出现的白屏现象
    let startIndex = startIndex.value;
    if (startIndex.value < screenContainSize.value) {
      startIndex.value = 0;
    } else {
      startIndex.value = startIndex.value - screenContainSize.value;
    }
    // 截取要展示的数据
    return dataList.slice(startIndex.value, endIndex);
  });
  // 计算上下空白占位填充
  const blankFillStyle = computed(() => {
    // 上方因为留了一屏缓冲数据，因此滚动过一屏数据后才开始计算上方空白占位
    let startIndex = startIndex.value;
    if (startIndex.value < screenContainSize.value) {
      startIndex.value = 0;
    } else {
      startIndex.value = startIndex.value - screenContainSize.value;
    }
    return {
      paddingTop: startIndex.value * itemHeight + "px",
      paddingBottom: (dataList.length - endIndex) * itemHeight + "px",
    };
  });
  
  onMounted(async () => {
    nextTick(() => {
      // 挂载后，根据可视容器高度计算可视屏幕容积数量
      myResize();
      // 屏幕尺寸变化以及横屏，都要重新计算可视屏幕容积数量
      window.onresize = myResize;
      window.onorientationchange = myResize;
      // 通过定时器节流处理生成的函数，用于处理滚动事件
      // scrollFn = throttle(setStartIndex, 17);
    });
  });
  </script>
  
  <style></style>
  