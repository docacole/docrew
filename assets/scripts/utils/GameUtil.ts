import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

export class GameUtil {
  // 清除节点下所有指定类型组件
  static clearFromParent(node: Node, component: any) {
    let arr = [];
    node.children.forEach((element) => {
      if (element.getComponent(component)) {
        arr.push(element);
      }
    });
    arr.forEach((element) => {
      element.removeFromParent();
    });
  }

  public static randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  //向下取整，如：min=0,max=10,结果：0，1，2，3，4，5，6，7，8，9
  public static randomBetweenFloor(min: number, max: number): number {
    let ret = Math.random() * (max - min) + min;
    return Math.floor(ret);
  }
}
