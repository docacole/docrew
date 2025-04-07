import {
  _decorator,
  BoxCollider2D,
  Component,
  director,
  EventTouch,
  Node,
  PolygonCollider2D,
  RigidBody2D,
  Sprite,
} from "cc";
const { ccclass, property } = _decorator;

import { ElementColor } from "../../common";
import { HoleElement } from "./HoleElement";

@ccclass("PinElement")
export class PinElement extends Component {
  pinColor: ElementColor = null;

  @property({ type: Sprite })
  pinSprite: Sprite = null!;

  hole: HoleElement = null!;

  // 是否正在移动
  private _isFlying: boolean = false;

  // 是否正在移动
  public get isFlying() {
    return this._isFlying;
  }

  // 设置移动状态
  public setIsFlying(isFlying: boolean) {
    this._isFlying = isFlying;
  }

  start() {
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
  }

  update(deltaTime: number) {}

  onTouchStart(e: EventTouch) {}

  public initElement(groupId: number, color: ElementColor, hole: HoleElement) {
    this.hole = hole;
    this.node.getComponent(RigidBody2D).group = groupId;
    this.node.getComponents(BoxCollider2D).forEach((collider) => {
      collider.group = groupId;
    });
    this.node.getComponents(PolygonCollider2D).forEach((collider) => {
      collider.group = groupId;
    });

    this.pinColor = color;

    this.resetImg();
  }

  resetImg() {
    if (!this.pinColor) return;

    this.pinSprite.color = this.pinColor.newColor(255);
  }
}
