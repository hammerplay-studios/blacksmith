import { b2Contact, b2ContactListener, b2Fixture } from "@flyover/box2d";
import { createFixedTimeStep } from "game-loops";
import { GameObject } from "./base/GameObject";
import { Collider2D } from "./components/Collider2D";
import { PhysicsSystem2D } from "./PhysicsSystem2D";

export class Blacksmith {
  private _gameObjects: Array<GameObject> = new Array<GameObject>();
  private interval: NodeJS.Timeout;

  private _physicsSystem2D: PhysicsSystem2D;
  public get physicsSystem2D(): PhysicsSystem2D {
    return this._physicsSystem2D;
  }

  private _room: any;
  public get room(): any {
    return this._room;
  }

  constructor(room?: any) {
    this._physicsSystem2D = new PhysicsSystem2D();
    this._room = room;
  }

  public Start() {
    const ms = 1000 / 59;
    const isPaused = () => false;
    const fixedTimeStep = new createFixedTimeStep(
      ms,
      isPaused,
      this.SimulationLoop.bind(this),
      100
    );
    this.interval = setInterval(fixedTimeStep.bind(this), ms);

    const contactListener: b2ContactListener = new b2ContactListener();

    contactListener.BeginContact = this.beginContact.bind(this);
    contactListener.EndContact = this.endContact.bind(this);
    this._physicsSystem2D.world.SetContactListener(contactListener);
  }

  private beginContact(contact: b2Contact) {
    const objectA: b2Fixture = contact.GetFixtureA();
    const objectB: b2Fixture = contact.GetFixtureB();

    let colliderA: Collider2D = objectA.GetUserData();
    let colliderB: Collider2D = objectB.GetUserData();
    if (colliderA != null && colliderB != null) {
      colliderA.gameObject.onCollisionEnter2D(colliderB);
      colliderB.gameObject.onCollisionEnter2D(colliderA);
    }
  }

  private endContact(contact: b2Contact) {
    const objectA: b2Fixture = contact.GetFixtureA();
    const objectB: b2Fixture = contact.GetFixtureB();

    let colliderA: Collider2D = objectA.GetUserData();
    let colliderB: Collider2D = objectB.GetUserData();
    if (colliderA != null && colliderB != null) {
      colliderA.gameObject.onCollisionExit2D(colliderB);
    }
  }

  private SimulationLoop(dt: number, t: number) {
    if (this.triggerExit) {
      for (let i = 0; i < this._gameObjects.length; i++) {
        this._gameObjects[i].isDestroy = true;
      }
      this.triggerGC = true;
    }

    for (let i = 0; i < this._gameObjects.length; i++) {
      this._gameObjects[i].update(dt);
    }

    if (this.triggerGC) this.GC();

    this._physicsSystem2D.step();

    if (this.triggerExit) {
      clearInterval(this.interval);
      this.triggerExit = false;
      console.log("Engine Shutdown");
    }
  }

  public Instantiate(name?: string): GameObject {
    //console.log (this);
    let gameObject = new GameObject(name, this);
    this._gameObjects.push(gameObject);
    return gameObject;
  }

  private triggerGC: boolean = false;

  public Destroy(gameObject: GameObject) {
    this.triggerGC = true;
    gameObject.isDestroy = true;
  }

  private GC() {
    let gameObjects: Array<GameObject> = new Array<GameObject>();

    for (let i = 0; i < this._gameObjects.length; i++) {
      if (this._gameObjects[i].isDestroy) {
        this._gameObjects[i].removeComponents();
        gameObjects.push(this._gameObjects[i]);
      }
    }

    for (let i = 0; i < gameObjects.length; i++) {
      const index = this._gameObjects.indexOf(gameObjects[i]);
      this._gameObjects.splice(index, 1);
      gameObjects[i] = null;
    }

    gameObjects = [];
    gameObjects = null;

    this.triggerGC = false;
  }

  private triggerExit: boolean = false;
  public Exit() {
    this.triggerExit = true;
  }
}
