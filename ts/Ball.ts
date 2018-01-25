import { Mesh, SphereGeometry, MeshBasicMaterial, Vector3, ArrowHelper, LineBasicMaterial, Geometry, Line, AxisHelper } from "three";
import { Planet } from "./Planet";

export class Ball extends Mesh{
    constructor(){
        super(new SphereGeometry(Ball.size, 32, 32), new MeshBasicMaterial({
            color: 'rgb(0,250,250)',
        }));
        this.add(this.arrowHelper);
        this.add(new AxisHelper(20))
    }

    private static readonly size = 3;
    private isCollisionBlocked = false;
    private isOnPlanet = false;
    private _velocity = new Vector3(-0.5, 0.5, 0);
    private arrowHelper = new ArrowHelper(new Vector3(), new Vector3(), 50);
    private pathVerticies: Vector3[] = [];

    get name(){ return 'Ball' }
    set name(_){ console.warn('name is readonly') }

    get velocity(){
        return this._velocity.clone();
    }

    getLine(){
        var lineMaterial = new LineBasicMaterial({
            color: 0xff0000
        });

        var geometry = new Geometry();

        geometry.vertices = this.pathVerticies;

        return new Line( geometry, lineMaterial );
    }

    private updateArrowHelper(){
        this.arrowHelper.setDirection(this._velocity.clone().normalize());
        this.arrowHelper.setLength(this._velocity.length() * 20);
    }
    addVelocity(vector: Vector3){
        this._velocity = this._velocity.add(vector);
    }
    isColliding(planet: Planet){
        if(this.isCollisionBlocked){
            console.log('collision blocked, aborting')
            return false;
        }
        if(this.position.distanceTo(planet.position) <= Ball.size + planet.size){
            console.log('collision');
            // rotate velocity vector by 90 degrees, slow it down
            let axis = new Vector3( 0, -1, 0 );
            // console.log(this.rotation);
            let angle = Math.PI / 2;
            console.log('velocity before bounce: ', this.velocity);
            this._velocity.applyAxisAngle( axis, angle ).multiplyScalar(0.6);
            this.isCollisionBlocked = true;
            console.log('velocity after bounce: ', this.velocity);            

            if(this.velocity.length() <= 0.02){
                this.isOnPlanet = true;
            }
            setTimeout(()=>{
                this.isCollisionBlocked = false;
            }, 150)

            return true;
        } else {
            return false;
        }
    }
    isCollidingWithAny(planets: Planet[]){
        return planets.some((planet)=>{
            return this.isColliding(planet);
        });
    }
    tick(){
        if(this.isOnPlanet){
            this._velocity = new Vector3();
        }
        this.position.add(this._velocity);
        this.updateArrowHelper();
        this.pathVerticies.push(this.position.clone());
        setTimeout(()=>{
            this.pathVerticies.shift();
        }, 50000); // path duration: 50s
    }
}