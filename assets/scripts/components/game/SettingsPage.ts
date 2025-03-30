import { _decorator, Component, Node } from "cc";
import { BasePage } from "../base/BasePage";

const { ccclass, property } = _decorator;

@ccclass("SettingsPage")
export class SettingsPage extends BasePage {
  start() {
    super.start();
  }

  update(deltaTime: number) {}
}
