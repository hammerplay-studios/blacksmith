import { b2Body, b2BodyDef, b2BodyType, b2FixtureDef, b2PolygonShape, b2Vec2, b2World } from "@flyover/box2d";

export const PTM_RATIO: number = 32;

export class PhysicsSystem2D {

    private timeStep: number = 1 / 60;
    public world: b2World;

    constructor () {
        this.world = new b2World(new b2Vec2(0, 0));
        this.world.SetGravity(new b2Vec2(0, -10), true);
    }

    public step () {
        this.world.Step(this.timeStep, 10, 10);
    }
}