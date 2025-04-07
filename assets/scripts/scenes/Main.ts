import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

import { Audios } from "../app/Constants";
import { Application } from "../app/Application";

import { AudioManager } from "../managers";
import { MenuPage } from "../components/game/pages";
import { RootLayer, EmptyLayer, SlotLayer } from "../components/game/layers";

@ccclass("Main")
export class Main extends Component {
  @property({ type: RootLayer })
  rootLayer: RootLayer;

  @property({ type: EmptyLayer })
  emptyLayer: EmptyLayer;

  @property({ type: SlotLayer })
  slotLayer: SlotLayer;

  @property({ type: MenuPage })
  menuPage: MenuPage;

  start() {
    Application.mainScene = this;

    this.restartGame();
  }

  update(deltaTime: number) {}

  /**
   * 重启游戏
   */
  restartGame() {
    Application.resetLevel();

    this.startGame();
  }

  startGame() {
    console.log("start game level >>>", Application.currentLevel);

    // 重置钉子、金币数量
    // Application.clearScene();

    this.rootLayer.initElement();
  }

  openMenuPage() {
    AudioManager.instance.playAudio(Audios.btn_1);
    this.menuPage.open();
  }
}
