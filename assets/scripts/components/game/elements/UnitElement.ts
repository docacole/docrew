import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

import { ElementColor } from "../../common";
import { LayerElement } from "./LayerElement";

@ccclass("UnitElement")
export class UnitElement extends Component {
  start() {}

  update(deltaTime: number) {}

  public initElement() {
    this.node.children.forEach((child: Node) => {
      child.getComponent(LayerElement).initElement();
    });
  }

  public initPins(pins: ElementColor[]) {
    this.node.children.forEach((child: Node, index: number) => {
      child.getComponent(LayerElement).layerColor = pins[index];
    });
  }

  public initHoles() {}
}
