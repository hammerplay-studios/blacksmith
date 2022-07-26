import { Mat4, Quat, Vec3 } from "../math";


export class Node {
    // world transform, don't access this directly
    protected declare _pos: Vec3;
    protected declare _rot: Quat;
    protected declare _scale: Vec3;
    protected declare _mat: Mat4;

    // local transform
    protected _lpos = new Vec3();
    protected _lrot = new Quat();
    protected _lscale = new Vec3(1, 1, 1);
    protected _euler = new Vec3();

    constructor (name?: string) {

    }
}