import { _decorator, Component, director, Node, Sprite } from "cc";
import { Application } from "../app/Application";
import ResourceManager from "../managers/ResourceManager";
import { Assets } from "../app/Constants";
const { ccclass, property } = _decorator;

@ccclass("Home")
export class Home extends Component {
  @property({ type: Node })
  logo: Node = null;
  @property({ type: Node })
  loading: Node = null;
  @property({ type: Sprite })
  loadingFill: Sprite = null;
  @property({ type: Node })
  btnsLayer: Node = null;

  private isLoading = true;
  private isGamePreloaded = false;
  private isApplicationLoaded = false;

  async start() {
    this.btnsLayer.active = false;

    await this.loadResources();
  }

  update(deltaTime: number) {
    if (!this.isLoading) return;

    this.loadingFill.fillRange = Application.loadingRate;

    if (Application.loadingRate >= 0.99) {
      this.isApplicationLoaded = true;
      this.isLoading = false;
      this.checkShowBtns();
    }
  }

  async loadResources() {
    // 预加载游戏内容
    director.preloadScene("Game", () => {
      console.log(">>>Game scene preload completed!!");
      this.isGamePreloaded = true;
      this.checkShowBtns();
    });

    await ResourceManager.instance.loadBundle("bundle", 0.2);
    await ResourceManager.instance.loadResource("bundle", Assets.Prefab, 0.6);
    await ResourceManager.instance.loadResource("bundle", Assets.Audio, 0.2);
  }

  // 开始游戏
  startGame() {
    director.loadScene("Game");
  }

  // 检查等级数据
  checkLevelData() {}

  checkShowBtns() {
    if (!this.isApplicationLoaded || !this.isGamePreloaded) return;

    this.loading.active = false;
    this.startGame();

    // this.btnsLayer.active = true;

    // let autoPlay = true;

    // this.btnsLayer.children.forEach((btn) => {
    //   if (btn.active) {
    //     autoPlay = false;
    //   }
    // });

    // if (autoPlay) {
    //   this.startGame();
    // } else {
    //   this.btnsLayer.children.forEach((btn) => {
    //     btn.active = true;
    //   });
    // }
  }
}
