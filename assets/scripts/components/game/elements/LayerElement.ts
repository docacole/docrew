import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

import { ElementColor } from "../../common";
import { Application } from "../../../app/Application";

@ccclass("LayerElement")
export class LayerElement extends Component {
  // 层ID
  layerGroupId = 0;

  // 层颜色
  layerColor: ElementColor = null;

  start() {}

  update(deltaTime: number) {}

  public initElement() {}

  public initPins(pins: ElementColor[]) {}

  public initHoles() {}
}
