import { _decorator, Asset, AudioClip, Component, Node, Prefab } from "cc";

import { Main } from "../scenes/Main";

export class Application {
  static start = false;

  // 加载率
  static loadingRate = 0;

  // 音效开关
  static audioSwitch = true;

  // 当前等级
  static currentLevel = 0;

  // 当前获取的金币
  static currentCoins = 0;

  static currentTotalPins = 0;
  static currentPinMoves = 0;

  // 游戏元素
  static mainScene: Main; // 主游戏场景

  // 根层
  public static get rootLayer() {
    return Application.mainScene.rootLayer;
  }

  // 空层
  public static get emptyLayer() {
    return Application.mainScene.emptyLayer;
  }

  // 插槽层
  public static get slotLayer() {
    return Application.mainScene.slotLayer;
  }

  // 重设游戏等级（游戏开始时调用）
  public static resetLevel(level = 0) {
    Application.currentLevel = level;
    Application.currentCoins = 0;
  }

  // 清场（每局游戏开始时调用）
  public static clearScene() {
    Application.currentTotalPins = 0;
    Application.currentPinMoves = 0;

    // 清理垃圾桶
  }

  private static _currentGroupId = 0;

  // 获取下一个组号
  public static nextGroupId() {
    const temp = 1 << Application._currentGroupId;
    Application._currentGroupId++;

    if (Application._currentGroupId >= 30) {
      Application._currentGroupId = 0;
    }

    return temp;
  }
}
