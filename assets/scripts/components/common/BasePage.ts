import { _decorator, Component, Node, Widget } from "cc";
const { ccclass, property } = _decorator;

import { AudioManager } from "../../managers/AudioManager";
import { Audios } from "../../app/Constants";

@ccclass("BasePage")
export class BasePage extends Component {
  start() {
    this.node.setPosition(0, -2200);
  }

  update(deltaTime: number) {}

  open() {
    this.node.active = true;
    this.node.setPosition(0, 0);

    const widget = this.node.getComponent(Widget);

    if (widget) {
      widget.top = 0;
      widget.left = 0;
      widget.right = 0;
      widget.bottom = 0;
    }
  }

  close() {
    AudioManager.instance.playAudio(Audios.btn_1);
    this.node.setPosition(-1000, 0);
    this.node.active = false;
  }
}
