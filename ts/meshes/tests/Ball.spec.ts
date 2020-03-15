import { Ball } from '../Ball'
import { Vector3, Line } from 'three';

describe('Ball', () => {
	test('addVelocity should work', () => {
		const ball = new Ball();
		const vel1 = new Vector3(2, 2, 2);
		const vel2 = new Vector3(0, 1, 2);

		ball.addVelocity(vel1)
		ball.addVelocity(vel2);

		expect(ball.getVelocity()).toEqual(new Vector3(2, 3, 4));
	}),

	test('createTrace should return new trace', () => {
		const ball = new Ball();

		const trace = ball.createTrace();

		expect(trace).toBeInstanceOf(Line)
	})
})