const { ccclass, property } = _decorator;
import { _decorator, Component, instantiate, Node, Prefab } from "cc";

import { GameUtil } from "../../../utils";
import { LevelLayer } from "./LevelLayer";
import { ResourcePool } from "../../../managers";
import { Application } from "../../../app/Application";

@ccclass("RootLayer")
export class RootLayer extends Component {
  levelLayer: LevelLayer;

  start() {}

  update(deltaTime: number) {}

  public initElement() {
    const level = Application.currentLevel;

    debugger;

    GameUtil.clearFromParent(this.node, LevelLayer);

    let levelPrefab = ResourcePool.instance.getLevelPrefab(level);

    let units: Prefab[] = [];

    if (!levelPrefab) {
      console.error(`Level ${level} not found`);

      levelPrefab = ResourcePool.instance.getPrefab("level_x");
      units = this.getLevelUnits(level);
    }

    const levelNode = instantiate(levelPrefab);
    if (units.length > 0) {
      console.log("生成关卡， units 数量：" + units.length);

      units.forEach((unit) => {
        const unitNode = instantiate(unit);
        levelNode.addChild(unitNode);
      });
    }

    this.levelLayer = levelNode.getComponent(LevelLayer);
    this.levelLayer.initElement();

    this.node.addChild(levelNode);
  }

  /**
   * 获取关卡单元
   * @param level
   * @returns
   */
  private getLevelUnits(level: number): Prefab[] {
    const units: Prefab[] = ResourcePool.instance.getPrefabForUnit();

    units.sort(() => {
      return Math.random() - 0.5;
    });

    let num = 1;
    if (level < 15) {
      num = 4;
    } else if (level < 20) {
      num = 5;
    } else if (level < 25) {
      num = 6;
    } else {
      num = 10;
    }

    const rtn: Prefab[] = [];
    for (let i = 0; i < num; i++) {
      rtn.push(units[i]);
    }

    return rtn;
  }
}
