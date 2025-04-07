import { _decorator, color, Component, Node } from "cc";
import { UnitElement } from "../elements/UnitElement";
import { Application } from "../../../app/Application";
import { GameState } from "../states";
const { ccclass, property } = _decorator;

/**
 * 游戏关卡，真正游戏内容
 */
@ccclass("LevelLayer")
export class LevelLayer extends Component {
  start() {}

  update(deltaTime: number) {}

  /**
   * 初始化元素
   */
  initElement() {
    // 初始化关卡
    GameState.initLevel();

    this.node.children.forEach((child) => {
      child.getComponent(UnitElement)?.initElement();
    });

    const colorPins = [];
    const colorSlots = [];
    const totalHoleCount = 0;
    const soltCount = totalHoleCount / 3;

    const levelColor = GameState.getCurrentLevelColor();

    for (let i = 0; i < soltCount; i++) {
      colorPins.push(levelColor.clone());
      colorPins.push(levelColor.clone());
      colorPins.push(levelColor.clone());
      colorSlots.push(levelColor);
    }

    colorPins.sort(() => Math.random() - 0.5);
    colorSlots.sort(() => Math.random() - 0.5);

    console.log("colorPins count", colorPins.length);
    console.log("colorSlots count", colorSlots.length);

    this.node.children.forEach((child) => {
      const unitElement = child.getComponent(UnitElement);

      unitElement.initPins(colorPins);
      unitElement.initHoles();
    });
  }

  // 获取关卡编号
  getLevel() {
    const arr = this.node.name.split("_");

    return Number(arr[1].trim());
  }

  // /**
  //  * 获取洞数量
  //  */
  // getHoleCount() {
  //   let count = 0;

  //   this.node.children.forEach((child) => {
  //     const _count = child.getComponent(UnitElement).getHoleCount();
  //     count += _count;
  //   });

  //   return count;
  // }
}
