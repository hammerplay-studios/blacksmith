import { Blacksmith } from "../Blacksmith";
import { Collider2D } from "../components/Collider2D";
import { Component } from "./Component";
import { IUpdate } from "./Lifecycles";

type constr<T> = { new (...args: unknown[]): T };

export class GameObject implements IUpdate {
  private _engine: Blacksmith;
  public get engine(): Blacksmith {
    return this._engine;
  }

  public _name: string;
  public get name(): string {
    return this._name;
  }

  constructor(name: string, engine: Blacksmith) {
    this._name = name;
    this._engine = engine;
  }

  protected _components: Map<string, Component> = new Map<string, Component>();
  private _cachedComponents: Array<Component> = new Array<Component>();

  public get components(): Component[] {
    return this._cachedComponents;
  }

  public addComponent(component: Component): Component {
    //console.log ('Adding component');
    component.gameObject = this;
    component.awake();
    component.enabled = true;
    component.start();

    let componentKey = component.constructor.name;
    if (this._components.has(componentKey)) {
      componentKey += `${Math.floor(Math.random() * 1000)}`;
    }

    this._components.set(component.constructor.name, component);
    this.isDirty = true;
    return component;
  }

  public getComponent(ctor: typeof Component): Component {
    if (this._components == null) return null;
    if (!this._components.has(ctor.name)) return null;

    return this._components.get(ctor.name);
  }

  public removeComponent(ctor: typeof Component): void {
    if (!this._components.has(ctor.name))
      throw new Error(`Component not found on Entity ${this.constructor.name}`);

    let component = this._components.get(ctor.name);
    component.onDisable();
    component.onDestroy();

    this._components.delete(ctor.name);

    this.isDirty = true;
  }

  private isDirty: boolean = false;

  public update(deltaTime: number): void {
    for (const component of this._cachedComponents) {
      if (component.enabled) component.update(deltaTime);
    }

    if (this.isDirty) {
      this._cachedComponents = Array.from(this._components.values());
      this.isDirty = false;
    }
  }

  public onCollisionEnter2D(other: Collider2D) {
    for (const component of this._cachedComponents) {
      if (component.enabled) component.onCollisionEnter2D(other);
    }
  }

  public onCollisionExit2D(other: Collider2D) {
    for (const component of this._cachedComponents) {
      if (component.enabled) component.onCollisionExit2D(other);
    }
  }

  public hasComponent(ctor: typeof Component): boolean {
    return this._components.has(ctor.name);
  }

  public removeComponents() {
    let keys = Array.from(this._components.keys());

    for (let i = 0; i < keys.length; i++) {
      const component = this._components.get(keys[i]);
      component.onDisable();
      component.onDestroy();
      this._components.delete(keys[i]);
    }

    delete this._components;
  }

  public isDestroy: boolean = false;
}
