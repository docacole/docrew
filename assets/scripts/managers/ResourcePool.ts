import { _decorator, Component, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ResourcePool")
export class ResourcePool {
  private _prefabPool: Record<string, Prefab> = {};

  private static _instance: ResourcePool = null;

  static get instance() {
    if (!this._instance) {
      this._instance = new ResourcePool();
      window["rp"] = this._instance;
    }

    return this._instance;
  }

  public setPrefab(name: string, prefab: Prefab) {
    this._prefabPool[name] = prefab;
  }

  public getPrefab(name: string) {
    return this._prefabPool[name];
  }

  /**
   * 获取关卡预制体
   * @param level
   * @returns
   */
  public getLevelPrefab(level: number): Prefab {
    return this.getPrefab(`level_${level}`);
  }

  public getPrefabForUnit(): Prefab[] {
    const arr: Prefab[] = [];

    // for (let key in this._prefabPool) {
    //   let prefab = this._prefabPool[key];
    //   if (prefab && prefab.data && prefab.data.getComponent(UnitAction)) {
    //     arr.push(prefab);
    //   }
    // }

    return arr;
  }
}
