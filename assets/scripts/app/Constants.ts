import { Asset, AudioClip, Prefab } from "cc";

// 应用资源
export interface ApplicationAsset {
  type: typeof Asset;
  path: string;
}

// 所有资源
export const Assets: Record<string, ApplicationAsset> = Object.freeze({
  Prefab: { type: Prefab, path: "preload/prefabs/" },
  Audio: { type: AudioClip, path: "preload/audios/" },
});

// 所有音频资源
export const Audios: Record<string, string> = Object.freeze({
  btn_1: "btn_2",
  btn_2: "btn_2",

  complete_1: "complete_1",
  complete_2: "complete_2",
  drill: "drill",
  pin_1: "pin_1",
  pin_2: "pin_2",
  pin_3: "pin_3",
  duang: "duang",
  popup: "popup",
  coins: "coins",
  reng: "reng",
  fail: "fail",
});
