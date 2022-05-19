import React, { PureComponent } from 'react';
import getDefaultXml from '../Bpmn/ProcessManage/BpmnEditor/sources/xml';
import BpmnModeler from 'bpmn-js/lib/Modeler'
// 直接使用css展示左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
// 引入右边工具栏
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
// bpmn的一个扩展工具
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
// 右边工具栏样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
// 汉化文件夹
import customTranslate from "./customTranslate/index";


class ProcessDesign extends PureComponent {
  state = {
    scale: 1, // 流程图比例
    svgVisible: false, // 预览图片
    svgSrc: '', // 图片地址
    bpmnModeler: null
  };

  componentDidMount() {
    let that = this
    // 汉化配置
    // let customTranslateModule = {
    //   translate: ["value", customTranslate],
    // };
    const diagramXML = getDefaultXml();
    this.bpmnModeler = new BpmnModeler({
      container: '#canvas',
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        // 右边的属性栏
        propertiesProviderModule,
        propertiesPanelModule,
        customTranslate,
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      },
      height: '100%',
      width: '100%'
    });

    this.bpmnModeler.importXML(diagramXML, function (err) {
      if (!err) {
        console.log('success!');
        that.bpmnModeler.get('canvas').zoom('fit-viewport');
      } else {
        console.log('something went wrong:', err);
      }
    });

  }

  render() {
    const { hidePanel, hideFold, hideCount, svgVisible, svgSrc } = this.state;
    return (
      <div id="canvas" style={{ width: "100vw", height: "100vh" }}>
        <div id="js-properties-panel"></div>
      </div>
    );
  }
}

export default ProcessDesign;
