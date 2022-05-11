import { b2FixtureDef, b2PolygonShape } from "@flyover/box2d";
import { PTM_RATIO } from "../PhysicsSystem2D";
import { Collider2D } from "./Collider2D";

export class BoxCollider2D extends Collider2D {
  protected _width: number = 0;
  public set width(value: number) {
    this._width = value;
  }
  public get width(): number {
    return this._width;
  }

  protected _height: number = 0;
  public set height(value: number) {
    this._height = value;
  }
  public get height(): number {
    return this._height;
  }

  awake(): void {
    super.awake();

    const colliderShape: b2PolygonShape = new b2PolygonShape();
    colliderShape.SetAsBox(
      this._width / 2 / PTM_RATIO,
      this._height / 2 / PTM_RATIO,
      { x: this._centerX / PTM_RATIO, y: this._centerY / PTM_RATIO }
    );

    const fixtureDef: b2FixtureDef = new b2FixtureDef();
    fixtureDef.shape = colliderShape;
    fixtureDef.density = this._density;
    fixtureDef.isSensor = this._isSensor;
    fixtureDef.friction = this.friction;
    fixtureDef.restitution = this._restitution;

    fixtureDef.filter.categoryBits = this._categoryBits;
    fixtureDef.filter.maskBits = this._maskBits;
    fixtureDef.userData = this;

    this._fixture = this._rigidbody.body.CreateFixture(fixtureDef);
  }
}
