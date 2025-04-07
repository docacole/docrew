import { AssetManager, assetManager, AudioClip } from "cc";
import { Application } from "../app/Application";
import { type ApplicationAsset, Assets } from "../app/Constants";

import { ResourcePool } from "./ResourcePool";

export default class ResourceManager {
  private static _instance: ResourceManager;

  public static get instance(): ResourceManager {
    if (!this._instance) {
      this._instance = new ResourceManager();
    }
    return this._instance;
  }

  private _bundles: Record<string, AssetManager.Bundle> = {};
  private _audios: Object = {};

  public loadBundle(name: string, ratio: number = 0): Promise<void> {
    return new Promise((resolve, reject) => {
      assetManager.loadBundle(
        name,
        (e: Error | null, bundle: AssetManager.Bundle) => {
          if (e) {
            console.error(`Bundle ${name} error.`, e);
            return reject(e);
          }

          this._bundles[name] = bundle;
          console.log(`Bundle ${name} loaded.`);
          Application.loadingRate += ratio;
          resolve();
        }
      );
    });
  }

  public async loadResource(
    name: string,
    type: ApplicationAsset,
    ratio: number = 0
  ): Promise<void> {
    const arr: number[] = [];

    return new Promise<void>((resolve, reject) => {
      this._bundles[name].loadDir(
        type.path,
        type.type,
        (finished: number, total: number) => {
          const progress = (ratio * finished) / total;
          arr.push(progress);

          if (arr.length == 1) {
            Application.loadingRate += progress;
          } else {
            Application.loadingRate +=
              arr[arr.length - 1] - arr[arr.length - 2];
          }
          console.log(
            "progress >>",
            progress,
            " Application.loadingRate>",
            Application.loadingRate
          );
        },
        (err: Error | null, assets: any[]) => {
          if (err) {
            console.error("load_resource error>>>", err);
            return resolve();
          }

          assets.forEach((it) => {
            switch (type) {
              case Assets.PREFAB:
                ResourcePool.instance.setPrefab(it.data.name, it);
                console.log("prefab>> " + it.data.name + " ");
                break;
              case Assets.AUDIO:
                this._audios[it.name] = it;
                console.log("audio>> " + it.name + " ");
                break;
            }
          });
          console.log(name + ">>" + type.path + "loaded success");
          resolve();
        }
      );
    });
  }

  public getAudio(name: string) {
    return this._audios[name];
  }
}
