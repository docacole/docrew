import { _decorator, Component, Node } from "cc";
import { AudioManager } from "../managers/AudioManager";
import { Audios } from "../app/Constants";
import { SettingsPage } from "../components/game/SettingsPage";
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  @property({ type: SettingsPage })
  settingsPage: SettingsPage;

  start() {}

  update(deltaTime: number) {}

  openSettingsPage() {
    AudioManager.instance.playAudio(Audios.btn_1);
    this.settingsPage.open();
  }
}
