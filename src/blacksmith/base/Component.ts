import { Collider2D } from '../components/Collider2D';
import { GameObject } from './GameObject'
import { IAwake, IOnCollisionEnter2D, IOnCollisionExit2D, IOnDestroy, IOnDisable, IOnEnable, IStart, IUpdate } from './Lifecycles'

export interface IComponent extends IAwake, IStart, IOnEnable, IOnDisable, IUpdate, IOnDestroy, IOnCollisionEnter2D, IOnCollisionExit2D  {
    //gameObject: GameObject | null,
}

export class Component implements IComponent {

    public gameObject: GameObject;

    protected _enabled: boolean;

    public get enabled() {
        return this._enabled;
    }

    public set enabled(value) {
        this._enabled = value;
        if (this._enabled)
            this.onEnable ();
        else
            this.onDisable ();
    }

    public get name (): string {
        return this.gameObject.name;
    }

    constructor () {
        //console.log ('object of this type: ', this.constructor.name);
    }
    

    awake(): void {
        //throw new Error('Method not implemented.')
    }

    start(): void {
        //throw new Error('Method not implemented.')
    }

    onEnable(): void {
        //throw new Error('Method not implemented.')
    }

    onDisable(): void {
        //throw new Error('Method not implemented.')
    }

    update(dt: number): void {
        //throw new Error('Method not implemented.')
    }

    onDestroy(): void {
        //throw new Error('Method not implemented.')
    }

    onCollisionEnter2D(other: Collider2D): void {
        
    }

    onCollisionExit2D(other: Collider2D): void {
        
    }
}

