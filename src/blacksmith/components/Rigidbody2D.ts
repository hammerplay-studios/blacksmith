import { b2Body, b2BodyDef, b2BodyType } from "@flyover/box2d";
import { Component } from "../base/Component";
import { Vector2 } from "../base/Vector2";
import { PhysicsSystem2D, PTM_RATIO } from "../PhysicsSystem2D";
import { Transform2D } from "./Transform2D";

export class Rigidbody2D extends Component {
  public body: b2Body;

  private _transform2D: Transform2D;

  public get transform2D(): Transform2D {
    return this._transform2D;
  }

  private _bodyDef: b2BodyDef;
  private _bodyType: b2BodyType = b2BodyType.b2_staticBody;

  public set bodyType(bodyType: b2BodyType) {
    this._bodyType = bodyType;
    if (this.body != null) this.body.SetType(this._bodyType);
  }

  public get bodyType(): b2BodyType {
    return this._bodyType;
  }

  protected _gravityScale: number = 1;
  public set gravityScale(value: number) {
    this._gravityScale = value;
    if (this.body != null) this.body.SetGravityScale(this._gravityScale);
  }
  public get gravityScale(): number {
    return this._gravityScale;
  }

  protected _linearDamping: number = 0;
  public set linearDamping(value: number) {
    this._linearDamping = value;
    if (this.body != null) this.body.SetLinearDamping(this._linearDamping);
  }

  public get linearDamping(): number {
    return this._linearDamping;
  }

  protected _angularDamping: number = 0;
  public set angularDamping(value: number) {
    this._angularDamping = value;
    if (this.body != null) this.body.SetAngularDamping(this._angularDamping);
  }

  public get angularDamping(): number {
    return this._angularDamping;
  }

  protected _angularVelocity: number = 0;
  public set angularVelocity(value: number) {
    this._angularVelocity = value;
    if (this.body != null) this.body.SetAngularVelocity(this._angularVelocity);
  }

  public get angularVelocity(): number {
    return this._angularVelocity;
  }

  protected _linearVelocity: Vector2 = new Vector2();
  public set linearVelocity(velocity: Vector2) {
    this._linearVelocity = velocity;
    if (this.body != null)
      this.body.SetLinearVelocity({
        x: this._linearVelocity.x,
        y: this._linearVelocity.y,
      });
  }

  public get linearVelocity(): Vector2 {
    return this._linearVelocity;
  }

  protected _fixedRotation: boolean = false;
  public set fixedRotation(value: boolean) {
    this._fixedRotation = value;
  }

  public get fixedRotation(): boolean {
    return this._fixedRotation;
  }

  protected _isBullet: boolean = false;
  public set isBullet(value: boolean) {
    this._isBullet = value;
  }

  public get isBullet(): boolean {
    return this._isBullet;
  }

  private _physicsSystem2D: PhysicsSystem2D;

  awake(): void {
    this._transform2D = this.gameObject.getComponent(
      Transform2D
    ) as Transform2D;
    this._physicsSystem2D = this.gameObject.engine.physicsSystem2D;

    this._bodyDef = new b2BodyDef();
    this._bodyDef.type = this._bodyType;
    this._bodyDef.gravityScale = this._gravityScale;
    this._bodyDef.linearDamping = this._linearDamping;
    this._bodyDef.angularDamping = this._angularDamping;
    this._bodyDef.angularVelocity = this._angularVelocity;
    this._bodyDef.linearVelocity.Set(
      this._linearVelocity.x,
      this._linearVelocity.y
    );
    this._bodyDef.fixedRotation = this._fixedRotation;

    this.body = this.gameObject.engine.physicsSystem2D.world.CreateBody(
      this._bodyDef
    );

    this.setPosition(
      this._transform2D.position.x,
      this._transform2D.position.y
    );
    this.body.SetUserData(this);
  }

  update(dt: number): void {
    let bodyPos = this.body.GetPosition();
    this._transform2D.position.x = bodyPos.x * PTM_RATIO;
    this._transform2D.position.y = bodyPos.y * PTM_RATIO;
    this._transform2D.angle = this.body.GetAngle();
    this._linearVelocity.x = this.body.GetLinearVelocity().x * PTM_RATIO;
    this._linearVelocity.y = this.body.GetLinearVelocity().y * PTM_RATIO;
  }

  setPosition(x: number, y: number) {
    this.body.SetPosition({ x: x / PTM_RATIO, y: y / PTM_RATIO });
  }
}
