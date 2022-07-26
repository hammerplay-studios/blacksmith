import { b2Fixture } from "@flyover/box2d";
import { Component } from "../core/scene/component";
import { PhysicsSystem2D } from "../PhysicsSystem2D";
import { Rigidbody2D } from "./Rigidbody2D";
import { Transform2D } from "./Transform2D";

export abstract class Collider2D extends Component {
  protected _rigidbody: Rigidbody2D;
  public get rigidbody(): Rigidbody2D {
    return this._rigidbody;
  }

  public get transform2D(): Transform2D {
    return this._rigidbody.transform2D;
  }

  protected _physicsSystem2D: PhysicsSystem2D;

  protected _centerX: number = 0;
  public set centerX(value: number) {
    this._centerX = value;
  }

  public get centerX(): number {
    return this._centerX;
  }

  protected _centerY: number = 0;
  public set centerY(value: number) {
    this._centerY = value;
  }

  public get centerY(): number {
    return this._centerY;
  }

  protected _fixture: b2Fixture;

  protected _density: number = 1;
  public set density(value: number) {
    this._density = value;
    if (this._fixture != null) this._fixture.SetDensity(this.density);
  }

  public get density(): number {
    return this._density;
  }

  protected _isSensor: boolean = false;
  public set isSensor(value: boolean) {
    this._isSensor = value;
    if (this._fixture != null) this._fixture.SetSensor(this._isSensor);
  }

  public get isSensor(): boolean {
    return this._isSensor;
  }

  protected _friction: number = 0;
  public set friction(value: number) {
    this._friction = value;
    if (this._fixture != null) this._fixture.SetFriction(this._friction);
  }

  protected _restitution: number = 0;
  public set restitution(value: number) {
    this._restitution = value;
    if (this._fixture != null) this._fixture.SetRestitution(value);
  }

  public get restitution(): number {
    return this._restitution;
  }

  protected _categoryBits: number = 1;
  public set categoryBits(value: number) {
    this._categoryBits = value;
    if (this._fixture != null)
      this._fixture.m_filter.categoryBits = this._categoryBits;
  }
  public get categoryBits(): number {
    return this._categoryBits;
  }

  protected _maskBits: number = 1;
  public set maskBits(value: number) {
    this._maskBits = value;
    if (this._fixture != null) this._fixture.m_filter.maskBits = this._maskBits;
  }

  public get maskBits(): number {
    return this._maskBits;
  }

  awake(): void {
    super.awake();
    this._physicsSystem2D = this.gameObject.engine.physicsSystem2D;
    this._rigidbody = this.gameObject.getComponent(Rigidbody2D) as Rigidbody2D;
  }
}
