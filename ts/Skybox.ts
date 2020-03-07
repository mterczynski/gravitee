import { BackSide, BoxGeometry, ImageUtils, Mesh, MeshBasicMaterial } from 'three';

export class Skybox extends Mesh {
	constructor() {
		const materials = [
			new MeshBasicMaterial({ side: BackSide, map: ImageUtils.loadTexture('/assets/skybox/sky4.png') }),
			new MeshBasicMaterial({ side: BackSide, map: ImageUtils.loadTexture('/assets/skybox/sky2.png') }),
			new MeshBasicMaterial({ side: BackSide, map: ImageUtils.loadTexture('/assets/skybox/sky1.png') }),
			new MeshBasicMaterial({ side: BackSide, map: ImageUtils.loadTexture('/assets/skybox/sky6.png') }),
			new MeshBasicMaterial({ side: BackSide, map: ImageUtils.loadTexture('/assets/skybox/sky3.png') }),
			new MeshBasicMaterial({ side: BackSide, map: ImageUtils.loadTexture('/assets/skybox/sky5.png') }),
		];
		const skyboxWidth = 10 ** 5;
		const geometry = new BoxGeometry(skyboxWidth, skyboxWidth, skyboxWidth);

		super(geometry, materials);
	}
}
