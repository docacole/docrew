import { _decorator, Color, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ElementColor")
export class ElementColor {
  id: number;
  r: number;
  g: number;
  b: number;

  constructor(id: number, r: number, g: number, b: number) {
    this.id = id;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public clone(): ElementColor {
    return new ElementColor(this.id, this.r, this.g, this.b);
  }

  public newColor(alpha: number): Color {
    return new Color(this.r, this.g, this.b, alpha);
  }
}
