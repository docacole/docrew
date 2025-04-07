import { _decorator, Component, Game, Node } from "cc";
import { ElementColor } from "../../common";
import { Application } from "../../../app/Application";
import { GameUtil } from "../../../utils";

const { ccclass, property } = _decorator;

@ccclass("GameState")
export class GameState {
  private static _currentColorIndex = 0;

  private static _levelColors: ElementColor[] = [];

  // 所有基础颜色
  private static _baseColors = [
    new ElementColor(10001, 13, 105, 105), // 深青
    new ElementColor(10002, 137, 89, 211), // 紫色
    new ElementColor(10003, 111, 111, 111), // 灰白
    new ElementColor(10004, 208, 191, 109), // 黄色
    new ElementColor(10005, 211, 139, 246), // 粉色
    new ElementColor(10006, 140, 214, 115), // 绿色
    new ElementColor(10007, 36, 118, 200), // 蓝色
    new ElementColor(10008, 17, 215, 215), // 青色
    new ElementColor(10009, 239, 91, 122), // 橘红
  ];

  /**
   * 初始化关卡
   */
  public static initLevel() {
    GameState.randomBaseColors();

    const levelColorCount = GameState.getLevelColorCount(
      Application.currentLevel
    );

    GameState.generateLevelColors(levelColorCount);

    GameState.resetCurrentLevelIndex();
  }

  /**
   * 获取关卡颜色
   */
  public static getCurrentLevelColor(): ElementColor {
    const levelColors = GameState._levelColors;

    let colorIndex = GameState._currentColorIndex;

    let rtn = levelColors[colorIndex];
    colorIndex++;

    if (colorIndex >= levelColors.length) {
      colorIndex = 0;
    }

    GameState._currentColorIndex = colorIndex;

    if (!rtn) {
      let r = GameUtil.randomBetweenFloor(1, 255);
      let g = GameUtil.randomBetweenFloor(1, 255);
      let b = GameUtil.randomBetweenFloor(1, 255);

      rtn = new ElementColor( // 防止index出界导致程序崩溃
        GameUtil.randomBetweenFloor(20000, 150000),
        r,
        g,
        b
      );

      console.log("没找到对应的 color ", colorIndex, " ", levelColors);
    }

    return rtn;
  }

  /**
   * 获取下一个基础颜色
   */
  public static nextLayerColor(): ElementColor {
    const color = GameState._baseColors[GameState._currentColorIndex];
    GameState._currentColorIndex++;

    if (GameState._currentColorIndex >= GameState._baseColors.length) {
      GameState._currentColorIndex = 0;
    }

    return color;
  }

  private static generateLevelColors(level: number) {
    const colors: ElementColor[] = [];

    GameState._baseColors.forEach((color) => {
      colors.push(color.clone());

      if (colors.length >= level) return;
    });

    GameState._levelColors = colors;
  }

  /**
   * 对基础颜色进行随机排序
   */
  private static randomBaseColors() {
    GameState._baseColors.sort((a, b) => {
      return Math.random() - 0.5;
    });
  }

  /**
   * 重置当前关卡颜色索引
   */
  private static resetCurrentLevelIndex() {
    GameState._currentColorIndex = 0;
  }

  /**
   * 获取指定游戏关卡颜色数量
   */
  private static getLevelColorCount(level: number) {
    let count = 3;
    if (level == 1) {
      count = 3;
    } else if (level == 2) {
      count = 5;
    } else if (level < 6) {
      count = 5;
    } else if (level < 8) {
      count = 6;
    } else if (level < 10) {
      count = 8;
    } else {
      count = level;
    }

    console.log(level, " > level, count >", count);

    return count;
  }
}
