import {
  _decorator,
  BoxCollider2D,
  Color,
  Component,
  instantiate,
  Node,
  PolygonCollider2D,
  RigidBody2D,
  Sprite,
} from "cc";
const { ccclass, property } = _decorator;

import { ElementColor } from "../../common";
import { ResourcePool } from "../../../managers/ResourcePool";

import { HoleElement } from "./HoleElement";
import { PinElement } from "./PinElement";

// 形状元素
@ccclass("ShapeElement")
export class ShapeElement extends Component {
  // 形状颜色
  shapeColor: ElementColor = null;

  start() {}

  update(deltaTime: number) {}

  // 获取形状的洞的数量
  public getHoleCount(): number {
    let count = 0;

    this.node.children.forEach((child) => {
      if (child.getComponent(HoleElement)) {
        count++;
      }
    });

    return count;
  }

  public initElement(groupId: number, color: ElementColor) {
    this.shapeColor = color;
    this.node.getComponent(RigidBody2D).group = groupId;
    this.node.getComponents(BoxCollider2D).forEach((collider) => {
      collider.group = groupId;
    });
    this.node.getComponents(PolygonCollider2D).forEach((collider) => {
      collider.group = groupId;
    });

    this.initImgColor(color, 190);
  }

  // 初始化背景颜色
  private initImgColor(color: ElementColor, alpha: number) {
    this.node.children.forEach((child) => {
      if (child.name === "img" && color) {
        const img = child.getComponent(Sprite);

        img.color = color.newColor(alpha);
      }
    });
  }

  // 初始化钉子
  public initPins(groupId: number, pinColors: ElementColor[]) {
    this.node.children.forEach((child) => {
      if (child.getComponent(HoleElement)) {
        const _pin = instantiate(ResourcePool.instance.getPrefab("pin"));
        this.node.addChild(_pin);
        _pin.setPosition(child.position);
        _pin
          .getComponent(PinElement)
          .initElement(
            groupId,
            pinColors.shift(),
            child.getComponent(HoleElement)
          );
      }
    });
  }
}
