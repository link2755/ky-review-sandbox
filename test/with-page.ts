import test from 'ava';
import {promiseWithTimeout} from './helpers/with-page.js';

test('promiseWithTimeout returns result when promise resolves in time', async t => {
	const result = await promiseWithTimeout(
		Promise.resolve('ok'),
		1000,
		'should not time out',
	);

	t.is(result, 'ok');
});

test.serial('promiseWithTimeout throws when promise does not resolve in time', async t => {
	const originalSetTimeout = globalThis.setTimeout;
	const scheduledDelays: number[] = [];
	globalThis.setTimeout = ((handler, delayMs, ...arguments_) => {
		if (typeof delayMs === 'number') {
			scheduledDelays.push(delayMs);
		}

		return originalSetTimeout(handler, delayMs, ...arguments_);
	}) as typeof globalThis.setTimeout;

	try {
		const neverSettlingPromise = new Promise<never>(() => {
			void 0;
		});
		const error = await t.throwsAsync(promiseWithTimeout(neverSettlingPromise, 10, 'timed out'));

		t.is(error?.message, 'timed out');
		t.deepEqual(scheduledDelays, [10]);
	} finally {
		globalThis.setTimeout = originalSetTimeout;
	}
});
