import { _decorator, Component, Node, UITransform, Vec3 } from "cc";
const { ccclass, property } = _decorator;

import { GameUtil } from "../../../utils/GameUtil";
import { PinElement } from "./PinElement";

@ccclass("EmptyHoleElement")
export class EmptyHoleElement extends Component {
  isLocked: boolean = false;

  start() {}

  update(deltaTime: number) {}

  initElement() {
    this.clearPins();
  }

  public putPin(pin: PinElement): boolean {
    const targetHole = this.getStagingPosition();

    // 没找到点位，放置失败
    if (!targetHole) return false;

    const worldPos = pin.node.getWorldPosition();

    const target = this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(worldPos);

    pin.setIsFlying(true);
  }

  public isPutable(): boolean {
    if (this.isLocked) return false;

    const targetHole = this.getStagingPosition();

    return !!targetHole;
  }

  /**
   * 将指定颜色的钉子加载到数组中
   * @param colorId
   * @param arr
   * @returns
   */
  public loadPinsByColorId(colorId: number, arr: PinElement[]): PinElement[] {
    this.node.children.forEach((child) => {
      const pin = child.getComponent(PinElement);

      if (pin?.pinColor?.id === colorId && !pin?.isFlying) {
        arr.push(pin);
      }
    });

    return arr;
  }

  public loadPins(arr: PinElement[] = null): PinElement[] {
    if (!arr?.length) arr = [];

    this.node.children.forEach((child) => {
      const pin = child.getComponent(PinElement);
      if (pin) {
        arr.push(pin);
      }
    });

    return arr;
  }

  private getStagingPosition(): Vec3 {
    const pins = this.getPins();

    // 有钉子了，不能放置
    if (pins.length > 0) return null;

    return new Vec3(0, 0, 0);
  }

  // 清除钉子
  private clearPins() {
    GameUtil.clearFromParent(this.node, PinElement);
  }
}
