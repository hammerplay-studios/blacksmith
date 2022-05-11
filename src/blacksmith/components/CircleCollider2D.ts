import { b2CircleShape, b2FixtureDef } from "@flyover/box2d";
import { PTM_RATIO } from "../PhysicsSystem2D";
import { Collider2D } from "./Collider2D";

export class CircleCollider2D extends Collider2D {

    protected _radius: number = 0;
    public set radius (value: number) {
        this._radius = value;
    }
    public get radius (): number {
        return this._radius;
    }

    awake(): void {
        super.awake ();

        const colliderShape: b2CircleShape = new b2CircleShape();
        colliderShape.m_radius = this._radius / PTM_RATIO;
        colliderShape.m_p.Set(this._centerX / PTM_RATIO, this._centerY / PTM_RATIO);
        
        const fixtureDef: b2FixtureDef = new b2FixtureDef();
        fixtureDef.shape = colliderShape;
        fixtureDef.density = this._density;
        fixtureDef.isSensor = this._isSensor;
        fixtureDef.friction = this.friction;
        fixtureDef.restitution = this._restitution;

        fixtureDef.filter.categoryBits = this._categoryBits;
        fixtureDef.filter.maskBits = this._maskBits;
        fixtureDef.userData = this;

        this._fixture = this._rigidbody.body.CreateFixture (fixtureDef);
    }
}