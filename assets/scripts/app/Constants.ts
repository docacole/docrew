import { Asset, AudioClip, Prefab } from "cc";

// 应用资源
export interface ApplicationAsset {
  type: typeof Asset;
  path: string;
}

// 应用事件
export const Events = Object.freeze({
  CHECK_COMPLETED: "check_completed",
  CHECK_EMPTY_HOLE: "check_empty_hole",
  REMOVE_ELEMENT: "remove_element",

  CHECK_GUIDE: "check_guide",
});

// 所有资源
export const Assets = Object.freeze({
  prefab: { type: Prefab, path: "preload/prefabs/" },
  audio: { type: AudioClip, path: "preload/audios/" },
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
