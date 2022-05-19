
## 学习资料

[全网最详bpmn.js](https://github.com/LinDaiDai/bpmn-chinese-document)  
[bpmn使用中文](https://www.cnblogs.com/HE0318bei/p/15919942.html)

## 项目解构

### src/Bpmn/ProcessManage/BpmnEditor/Modeler/index.js

文件对 bpmn-js/lib/Modeler 包重构，实现左侧自定义工具栏。

```JavaScript
// ProcessDesign.js
// 使用官方库
- import BpmnModeler from './BpmnEditor/Modeler';
+ import BpmnModeler from 'bpmn-js/lib/Modeler';
// 引入以下css使用bpmn官方流绘图工具，则无法修改工具，默认语言是英文
+ import 'bpmn-js/dist/assets/diagram-js.css' 
+ import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
+ import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
+ import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
```

### src/Bpmn/ProcessManage/BpmnEditor/Modeler/custom*

自定义的工具文件

#### 如何开发自定义工具
<!-- TODO -->

### src/Bpmn/ProcessManage/bpmn-js-properties-panel

实现右侧属性面板工具。文件是bpmn-js-properties-panel库的源码

```JavaScript
// ProcessDesign.js

- import propertiesPanelModule from './bpmn-js-properties-panel/lib';
- import propertiesProviderModule from './bpmn-js-properties-panel/lib/provider/flowable';
// 使用官方库属性面板，默认语言是英文
+ import propertiesPanelModule from 'bpmn-js-properties-panel'
+ import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'

// 右边工具栏样式，样式通常要重新写
+ import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
```
