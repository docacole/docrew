import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

import { BasePage } from "../../common/BasePage";

@ccclass("MenuPage")
export class MenuPage extends BasePage {
  start() {
    super.start();
  }

  update(deltaTime: number) {}
}
