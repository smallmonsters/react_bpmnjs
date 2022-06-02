- [Bpmn目录](#bpmn目录)
- [学习资料](#学习资料)
- [使用Demo](#使用demo)
  - [安装](#安装)
  - [在React中使用react-bpmn](#在react中使用react-bpmn)
  - [显示左侧工具栏](#显示左侧工具栏)
  - [显示中文](#显示中文)
  - [显示右侧属性面板](#显示右侧属性面板)
  - [修改样式](#修改样式)
  - [去掉logo](#去掉logo)
  - [自定义属性面板](#自定义属性面板)
- [Bpmn知识](#bpmn知识)
  - [各个部分的名称](#各个部分的名称)
  - [importXML](#importxml)

## Bpmn目录

这个是fork过来的比较完整的案例，OLD_README.md是fork的README。

## 学习资料

[全网最详bpmn.js](https://github.com/LinDaiDai/bpmn-chinese-document)：所有文章看下来，就会对bpmn.js有大概的理解了  
[bpmn使用中文](https://www.cnblogs.com/HE0318bei/p/15919942.html)  
[Bpmn.js简介与基础使用](https://juejin.cn/post/6900793894263488519#heading-14)  
[官方的案例](https://github.com/bpmn-io/bpmn-js-examples/blob/master/README.md)：比如如何国际化、自定义的工具文件等。  

## 使用[Demo](https://github.com/smallmonsters/react_bpmnjs/blob/smallmonsters/src/Dome/index.js)

### 安装

```bash
npm i bpmn-js --save-D
```

### 在React中使用[react-bpmn](https://github.com/bpmn-io/react-bpmn/blob/master/README.md)

复制src/index.js到Dome/ReactBpmn.js

```jsx
//修改 Dome/ReactBpmn.js
...
- import BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js';
+ import BpmnModeler from 'bpmn-js/lib/Modeler'
...
componentDidMount() {
    const {
      url,
      diagramXML,
+      options = {},
    } = this.props;

    const container = this.containerRef.current;
-    this.bpmnViewer = new BpmnModeler({ container });
+    this.bpmnViewer = new BpmnModeler({ container, ...options });
...
- <div className="react-bpmn-diagram-container" ref={this.containerRef}></div>
+ <div style={{ height: "100vh"}} className="react-bpmn-diagram-container" ref={this.containerRef}></div>


//Dome/index.js
import React from 'react';
import getDefaultXml from '../Bpmn/ProcessManage/BpmnEditor/sources/xml';
import ReactBpmn from './ReactBpmn'

const diagramXML = getDefaultXml();

const ProcessDesign = () => {

  const onError = (err) => {
    console.error('failed to render diagram', err);
  }

  const onLoading = () => {
    console.log('loading diagram');
  }

  const onShown = () => {
    console.log('diagram shown');
  }
  return <ReactBpmn
    diagramXML={diagramXML}
    onLoading={onLoading}
    onShown={onShown}
    onError={onError}
  />
}
```

### 显示左侧工具栏

```JavaScript
//Dome/index.js
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
```

### [显示中文](https://www.cnblogs.com/HE0318bei/p/15919942.html)

```JavaScript
// 新建customTranslate/index.js
import CustomTranslate from './customTranslate';

export default {
    __init__: ['translate'],
    translate: ['value', CustomTranslate],
};

// Dome/index.js
+ import customTranslate from "./customTranslate/index";

 <ReactBpmn
      ref={bpmnRef}
      diagramXML={diagramXML}
      onLoading={onLoading}
      onShown={onShown}
      onError={onError}
+      options={
+        {
+          additionalModules: [
+            customTranslate,
+          ]
+        }}
    />

```

**注意：**翻译文本不全

### 显示右侧属性面板

安装：  

```bash
npm install --save bpmn-js-properties-panel  
npm install --save camunda-bpmn-moddle
```

```JavaScript
//Dome/index.js

// 引入右边工具栏
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
// bpmn的一个扩展工具
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
// 右边工具栏样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

```

### 修改样式

引入右侧属性面板后无法看到属性面板，因为画布、工具栏和属性面板需要自己设置样式。

```JavaScript
// 修改Dome/index.js DOM结构
  return (
    <>
      <div className={styles.container}>
        <div id="properties-panel"></div>
        <ReactBpmn
          className={styles.canvas}
          ref={bpmnRef}
          diagramXML={diagramXML}
          onLoading={onLoading}
          onShown={onShown}
          onError={onError}
          options={
            {
              additionalModules: [
                customTranslate,
                propertiesPanelModule,
                propertiesProviderModule
              ],
              propertiesPanel: {
                parent: '#properties-panel'
              },
              moddleExtensions: {
                camunda: camundaModdleDescriptor
              },
              height: "100%",
              width: "100%",
            }}
        />
      </div >
    </>
  )
}
```

```JavaScript
// 修改Dome/ReactBpmn.js DOM结构
render() {
    const { onShown, onError, onLoading, diagramXML, options, ...props } = this.props;
    return (
      <div
        {...props}
        ref={this.containerRef}></div>
    );
  }

```

```less
// 新增 Dome/index.less
.container {
  position: relative;
  flex: auto;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-size: 12px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  background: #fff;
  border: 1px solid #ddd;
  :global(#properties-panel) {
    position: absolute;
    width: 320px;
    height: 100%;
    overflow: scroll;
    right: 0;
  }
  .canvas {
    width: calc(100% - 320px);
    height: 100%;
  }
}

```

### 去掉logo

```JavaScript
// Dome/index.js
useEffect(() => {
    // 删除 bpmn logo  bpmn.io官方要求不给删或者隐藏，否则侵权
    const bjsIoLogo = document.querySelector('.bjs-powered-by');
    while (bjsIoLogo.firstChild) {
      bjsIoLogo.removeChild(bjsIoLogo.firstChild);
    }
  }, [])
```

### 自定义属性面板

- [官方案例](https://github.com/bpmn-io/bpmn-js-examples/blob/master/properties-panel-extension)

跟着这篇[文章](https://github.com/LinDaiDai/bpmn-chinese-document/blob/master/LinDaiDai/全网最详bpmn.js教材-properties-panel篇(上).md)做就可以了

**注意：**使用了自定义属性面板，要继续使用官方的属性面板，必须自己集成进来。

## Bpmn知识

### 各个部分的名称

![各个部分的名称](https://github.com/smallmonsters/react_bpmnjs/blob/smallmonsters/static/部件名称.png)

<!-- TODO: -->
### importXML
