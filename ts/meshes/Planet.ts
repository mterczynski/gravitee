import { BackSide, Color, Mesh, MeshBasicMaterial, MeshPhongMaterial, SphereGeometry, Vector3 } from 'three';
import { Ball } from './Ball';
import { settings } from '../settings';

function createBorderMesh(planetRadius: number) {
	const borderMaterial = new MeshBasicMaterial({
		color: 'rgb(0,0,0)',
		side: BackSide,
	});

	const widthSegments = 32;
	const heightSegments = 32;
	const borderThickness = 1;

	return new Mesh(
		new SphereGeometry(
			planetRadius + borderThickness,
			widthSegments,
			heightSegments
		),
		borderMaterial
	);
}

export class Planet extends Mesh {
	get mass() {
		// https://en.wikipedia.org/wiki/Sphere#Enclosed_volume
		const sphereVolumeMultiplier = Math.PI * 4 / 3;

		return this.density * (this.radius ** 3) * sphereVolumeMultiplier;
	}

	readonly radius: number;
	readonly density: number;

	constructor({radius, color = new Color('red'), density = settings.defaultPlanetDensity}: {
		radius: number,
		density?: number
		color?: Color
	}) {
		super(new SphereGeometry(radius, 32, 32), new MeshPhongMaterial({ color }));
		this.radius = radius;
		this.density = density;
		this.add(createBorderMesh(radius));
	}
}
