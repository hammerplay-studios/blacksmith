import { IPoint } from "./Interfaces";

export class Vector2 implements IPoint {
  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }

  protected _x: number = 0;
  public set x(value: number) {
    this._x = value;
  }
  public get x(): number {
    return this._x;
  }

  protected _y: number = 0;
  public set y(value: number) {
    this._y = value;
  }
  public get y(): number {
    return this._y;
  }

  public subtract(v: Vector2): this {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  public length(): number {
    const x: number = this.x,
      y: number = this.y;
    return Math.sqrt(x * x + y * y);
  }
}
