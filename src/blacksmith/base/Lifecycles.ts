import { Collider2D } from "../components/Collider2D";

export interface IAwake {
  awake(): void;
}

export interface IStart {
  start(): void;
}

export interface IOnEnable {
  onEnable(): void;
}

export interface IOnDisable {
  onDisable(): void;
}

export interface IUpdate {
  update(dt: number): void;
}

export interface IOnDestroy {
  onDestroy(): void;
}

export interface IOnCollisionEnter2D {
  onCollisionEnter2D(other: Collider2D): void;
}

export interface IOnCollisionExit2D {
  onCollisionExit2D(other: Collider2D): void;
}
