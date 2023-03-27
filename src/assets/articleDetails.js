export default {
  arr: [
    {
      nameId: 'PromiseAndThen',
      name: "手写promise以及.then",
      rlseTime: "2022-8-21",
      title: "手写promise以及.then的链式调用",
      tag: "前端：手写promise以及.then",
      briefIntroduction:
        "如果要理解一个东西，那就去手动实现，首先你会发现自己对他理解的问题，其次也会增加自己对其的理解程度。promise就是一个好的选择，并且刚好还有promise的手写面试题，你确定不试试吗？",
      imgSrc: require("../assets/image/Blog/blog4.jpg"),
      flag: false,
      content: `<h2 id="😲 md-editor-v3"><a href="#😲 md-editor-v3">😲 md-editor-v3</a></h2><p>Markdown 编辑器，vue3 版本，使用 jsx 模板 和 typescript 开发，支持切换主题、prettier 美化文本等。</p>
      <h3 id="🤖 基本演示"><a href="#🤖 基本演示">🤖 基本演示</a></h3><p><strong>加粗</strong>，<u>下划线</u>，_斜体_，<del>删除线</del>，上标<sup>26</sup>，下标<sub>1</sub>，<code>inline code</code>，<a href="https://imzbf.cc">超链接</a></p>
      <blockquote>
      <p>引用：《I Have a Dream》</p>
      </blockquote>
      <ol>
      <li>So even though we face the difficulties of today and tomorrow, I still have a dream.</li><li>It is a dream deeply rooted in the American dream.</li><li>I have a dream that one day this nation will rise up.</li></ol>
      <ul>
      <li class="li-task"><input disabled="" type="checkbox"> 周五</li><li class="li-task"><input disabled="" type="checkbox"> 周六</li><li class="li-task"><input checked="" disabled="" type="checkbox"> 周天</li></ul>
      <p><span class="figure"><img src="https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif" title="" alt="图片" zoom=""><span class="figcaption">图片</span></span></p>
      <h2 id="🤗 代码演示"><a href="#🤗 代码演示">🤗 代码演示</a></h2><pre><code class="language-vue"><span class="code-block"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">MdEditor</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"text"</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
      
      <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
      <span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
      <span class="hljs-keyword">import</span> <span class="hljs-title class_">MdEditor</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'md-editor-v3'</span>;
      <span class="hljs-keyword">import</span> <span class="hljs-string">'md-editor-v3/lib/style.css'</span>;
      
      <span class="hljs-keyword">const</span> text = <span class="hljs-title function_">ref</span>(<span class="hljs-string">'Hello Editor!'</span>);
      </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
      </code></pre>
      <h2 id="🖨 文本演示"><a href="#🖨 文本演示">🖨 文本演示</a></h2><p>依照普朗克长度这项单位，目前可观测的宇宙的直径估计值（直径约 930 亿光年，即 8.8 × 10<sup>26</sup> 米）即为 5.4 × 10<sup>61</sup>倍普朗克长度。而可观测宇宙体积则为 8.4 × 10<sup>184</sup>立方普朗克长度（普朗克体积）。</p>
      <h2 id="📈 表格演示"><a href="#📈 表格演示">📈 表格演示</a></h2><table>
      <thead>
      <tr>
      <th>昵称</th>
      <th>来自</th>
      </tr>
      </thead>
      <tbody><tr>
      <td>之间</td>
      <td>中国-重庆</td>
      </tr>
      </tbody></table>
      <h2 id="📏 公式"><a href="#📏 公式">📏 公式</a></h2><p>行内：<span class="md-editor-katex-inline" data-processed=""><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>x</mi><mo>+</mo><msup><mi>y</mi><mrow><mn>2</mn><mi>x</mi></mrow></msup></mrow><annotation encoding="application/x-tex">x+y^{2x}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.0085em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span><span class="mord mathnormal mtight">x</span></span></span></span></span></span></span></span></span></span></span></span></span></p>
      <span class="md-editor-katex-block" data-processed=""><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mroot><mi>x</mi><mn>3</mn></mroot></mrow><annotation encoding="application/x-tex">\sqrt[3]{x}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1908em;"></span><span class="mord sqrt"><span class="root"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7172em;"><span style="top:-2.895em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size6 size1 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span></span></span></span><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8492em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord mathnormal">x</span></span></span><span style="top:-2.8092em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width="400em" height="1.08em" viewBox="0 0 400000 1080" preserveAspectRatio="xMinYMin slice"><path d="M95,702
      c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
      c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
      c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
      s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
      c69,-144,104.5,-217.7,106.5,-221
      l0 -0
      c5.3,-9.3,12,-14,20,-14
      H400000v40H845.2724
      s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
      c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
      M834 80h400000v40h-400000z"></path></svg></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height:0.1908em;"><span></span></span></span></span></span></span></span></span></span></span><h2 id="🧬 图表"><a href="#🧬 图表">🧬 图表</a></h2><div class="md-editor-mermaid"><svg id="md-editor-mermaid-lfpeanqz" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="132.79999542236328" style="max-width: 66.01250457763672px;" viewBox="0 0 66.01250457763672 132.79999542236328"><style>#md-editor-mermaid-lfpeanqz {font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}#md-editor-mermaid-lfpeanqz .error-icon{fill:#552222;}#md-editor-mermaid-lfpeanqz .error-text{fill:#552222;stroke:#552222;}#md-editor-mermaid-lfpeanqz .edge-thickness-normal{stroke-width:2px;}#md-editor-mermaid-lfpeanqz .edge-thickness-thick{stroke-width:3.5px;}#md-editor-mermaid-lfpeanqz .edge-pattern-solid{stroke-dasharray:0;}#md-editor-mermaid-lfpeanqz .edge-pattern-dashed{stroke-dasharray:3;}#md-editor-mermaid-lfpeanqz .edge-pattern-dotted{stroke-dasharray:2;}#md-editor-mermaid-lfpeanqz .marker{fill:#333333;stroke:#333333;}#md-editor-mermaid-lfpeanqz .marker.cross{stroke:#333333;}#md-editor-mermaid-lfpeanqz svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#md-editor-mermaid-lfpeanqz .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#md-editor-mermaid-lfpeanqz .cluster-label text{fill:#333;}#md-editor-mermaid-lfpeanqz .cluster-label span{color:#333;}#md-editor-mermaid-lfpeanqz .label text,#md-editor-mermaid-lfpeanqz span{fill:#333;color:#333;}#md-editor-mermaid-lfpeanqz .node rect,#md-editor-mermaid-lfpeanqz .node circle,#md-editor-mermaid-lfpeanqz .node ellipse,#md-editor-mermaid-lfpeanqz .node polygon,#md-editor-mermaid-lfpeanqz .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#md-editor-mermaid-lfpeanqz .node .label{text-align:center;}#md-editor-mermaid-lfpeanqz .node.clickable{cursor:pointer;}#md-editor-mermaid-lfpeanqz .arrowheadPath{fill:#333333;}#md-editor-mermaid-lfpeanqz .edgePath .path{stroke:#333333;stroke-width:2.0px;}#md-editor-mermaid-lfpeanqz .flowchart-link{stroke:#333333;fill:none;}#md-editor-mermaid-lfpeanqz .edgeLabel{background-color:#e8e8e8;text-align:center;}#md-editor-mermaid-lfpeanqz .edgeLabel rect{opacity:0.5;background-color:#e8e8e8;fill:#e8e8e8;}#md-editor-mermaid-lfpeanqz .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#md-editor-mermaid-lfpeanqz .cluster text{fill:#333;}#md-editor-mermaid-lfpeanqz .cluster span{color:#333;}#md-editor-mermaid-lfpeanqz div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#md-editor-mermaid-lfpeanqz :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g transform="translate(0, 0)"><marker id="flowchart-pointEnd" class="marker flowchart" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker><marker id="flowchart-pointStart" class="marker flowchart" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker><marker id="flowchart-circleEnd" class="marker flowchart" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle></marker><marker id="flowchart-circleStart" class="marker flowchart" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle></marker><marker id="flowchart-crossEnd" class="marker cross flowchart" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path></marker><marker id="flowchart-crossStart" class="marker cross flowchart" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path></marker><g class="root"><g class="clusters"></g><g class="edgePaths"><path d="M33.00625038146973,41.400001525878906L33.00625038146973,45.56666819254557C33.00625038146973,49.73333485921224,33.00625038146973,58.06666819254557,33.00625038146973,66.4000015258789C33.00625038146973,74.73333485921223,33.00625038146973,83.06666819254558,33.00625038146973,87.23333485921223L33.00625038146973,91.4000015258789" id="L-Start-Stop-0" class=" edge-thickness-normal edge-pattern-solid flowchart-link LS-Start LE-Stop" style="fill:none;" marker-end="url(#flowchart-pointEnd)"></path></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default default" id="flowchart-Start-2" transform="translate(33.00625038146973, 24.700000762939453)"><rect class="basic label-container" style="" rx="0" ry="0" x="-25.006250381469727" y="-16.699999809265137" width="50.01250076293945" height="33.39999961853027"></rect><g class="label" style="" transform="translate(-17.506250381469727, -9.199999809265137)"><foreignObject width="35.01250076293945" height="18.399999618530273"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Start</span></div></foreignObject></g></g><g class="node default default" id="flowchart-Stop-3" transform="translate(33.00625038146973, 108.10000228881836)"><rect class="basic label-container" style="" rx="0" ry="0" x="-23.27500057220459" y="-16.699999809265137" width="46.55000114440918" height="33.39999961853027"></rect><g class="label" style="" transform="translate(-15.77500057220459, -9.199999809265137)"><foreignObject width="31.55000114440918" height="18.399999618530273"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Stop</span></div></foreignObject></g></g></g></g></g></svg></div><h2 id="🪄 提示"><a href="#🪄 提示">🪄 提示</a></h2><p>!!! note 支持的类型</p>
      <p>note、abstract、info、tip、success、question、warning、failure、danger、bug、example、quote、hint、caution、error、attention</p>
      <p>!!!</p>
      <h2 id="☘️ 占个坑@！"><a href="#☘️ 占个坑@！">☘️ 占个坑@！</a></h2>`,
      mdSourceCode: ''
    },
    {
      nameId: 'DetailsOfVue2Responsive',
      name: "Vue2响应式原理详解",
      rlseTime: "2022-8-21",
      title: "Vue2响应式原理详解",
      tag: "前端：Vue2响应式原理",
      briefIntroduction:
        "Vue2响应式原理，其实这个问题也基本上问烂了，但是依旧会有很多的小伙伴对这个不清楚，当然我也是对这个东西不理解的很多，但是现在对他的理解更加深刻了，学习并不是一蹴而就，学习过程需要慢慢来。加油吧，少年！",
      imgSrc: require("../assets/image/Blog/blog2.webp"),
      flag: true,
      content: '',
      mdSourceCode: ''
    },
    {
      nameId: 'BFSAndDFS',
      name: "BFS以及DFS",
      rlseTime: "2022-8-14",
      title: "BFS以及DFS",
      tag: "算法：二叉树遍历BFS以及DFS",
      briefIntroduction:
        "面试过程当中被问到了的问题，自己算法并不算好，所以这方面比较薄弱，所以自己去研究了这两个算法，并不算大成，我只能说代码很好理解，对我而言，假如你也不清楚就来看看吧。",
      imgSrc: require("../assets/image/Blog/blog1.png"),
      flag: false,
      content: '',
      mdSourceCode: ''
    },
    {
      nameId: 'MacroTaskMicroTask',
      name: "宏任务与微任务实例解析",
      rlseTime: "2022-7-18",
      title: "宏任务与微任务实例解析",
      tag: "前端：字节青训营笔试题疑问",
      briefIntroduction:
        "2022年，今年参加了字节的第四届青训营，在做题的过程当中发现了自己的一些问题所在，有些并不是很精通，所以自己又去研究了一番。也算是小有所获，如果你也不清楚的话，就来看看吧！",
      imgSrc: require("../assets/image/Blog/blog0.png"),
      flag: true,
      content: '',
      mdSourceCode: ''
    },
  ],
};
