import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

import { PinElement } from "../elements/PinElement";
import { EmptyHoleElement } from "../elements/EmptyHoleElement";

@ccclass("EmptyLayer")
export class EmptyLayer extends Component {
  start() {}

  update(deltaTime: number) {}

  /**
   * 初始化元素
   */
  public initElement() {
    this.node.children.forEach((child, index) => {
      const emptyHole = child.getComponent(EmptyHoleElement);
      emptyHole?.initElement();
    });
  }

  public putPin(pin: PinElement) {
    this.node.children.forEach((child, index) => {
      const emptyHole = child.getComponent(EmptyHoleElement);

      if (emptyHole?.isPutable()) {
        if (emptyHole.putPin(pin)) {
          return; // 放入成功，退出循环
        }
      }
    });
  }

  /**
   * 检查是否已经满了
   * @returns
   */
  public checkIsPinFull(): boolean {
    let isFull = true;

    this.node.children.forEach((child, index) => {
      const emptyHole = child.getComponent(EmptyHoleElement);

      // 如果有一个可以放入针子的洞，则说明还没有满
      if (emptyHole?.isPutable()) {
        isFull = false;
        return;
      }
    });

    return isFull;
  }

  /**
   * 将所有指定颜色的针子放入数组
   * @param colorId
   * @param arr
   */
  public loadPinsByColorId(colorId: number, arr: PinElement[]) {
    this.node.children.forEach((child, index) => {
      child.getComponent(EmptyHoleElement)?.loadPinsByColorId(colorId, arr);
    });
  }

  /**
   * 将所有螺丝放入数组
   * @param arr
   * @returns
   */
  public loadPins(arr: PinElement[] = null): PinElement[] {
    if (!arr) arr = [];

    this.node.children.forEach((child, index) => {
      const emptyHole = child.getComponent(EmptyHoleElement);
      if (emptyHole) {
        emptyHole.loadPins(arr);
      }
    });

    return arr;
  }
}
