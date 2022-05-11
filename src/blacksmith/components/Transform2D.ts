import { Component, IComponent } from '../base/Component';
import { Vector2 } from '../base/Vector2';
import { GameObject } from '../base/GameObject';

export class Transform2D extends Component {

    gameObject: GameObject;
    _enabled: boolean;

    public position: Vector2 = new Vector2();

    public angle: number = 0;

    public SetPosition (x: number, y?: number) {
        this.position.x = x;
        this.position.y = y ?? this.position.y;
    }

    toString () {
        return `x: ${this.position.x}, y: ${this.position.y}`;
    }
}