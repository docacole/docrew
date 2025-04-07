import { _decorator, AudioSourceComponent, Component, Node } from "cc";
import { Application } from "../app/Application";
import { Audios } from "../app/Constants";
import ResourceManager from "./ResourceManager";
const { ccclass, property } = _decorator;

@ccclass("AudioManager")
export class AudioManager {
  private asc: AudioSourceComponent = null;

  private static _instance: AudioManager = null!;

  public static get instance() {
    if (!this._instance) {
      this._instance = new AudioManager();
      this._instance.asc = new AudioSourceComponent();
      this._instance.asc.loop = true;
    }

    return this._instance;
  }

  // 播放声音
  public async playAudio(name: string, volumeScale = 0.7) {
    if (!Application.audioSwitch) {
      return;
    }

    switch (name) {
      case Audios.reng:
        volumeScale = 0.2;
        break;
      case Audios.btn_1:
        volumeScale = 0.5;
        break;
        break;
      case Audios.complete_1:
        volumeScale = 0.3;
        break;
    }

    const audio = await ResourceManager.instance.getAudio(name);
    if (!audio) {
      console.log("声音播放错误，audio:", audio);
    } else {
      this.asc.playOneShot(audio, volumeScale);
    }
  }
}
