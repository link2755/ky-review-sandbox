import test from 'ava';
import delay from '../source/utils/delay.js';

test.serial('aborting a delay releases its scheduled timer', async t => {
	const original = globalThis.clearTimeout;
	let cleared = false;

	globalThis.clearTimeout = (...arguments_: Parameters<typeof clearTimeout>) => {
		cleared = true;
		original(...arguments_);
	};

	t.teardown(() => {
		globalThis.clearTimeout = original;
	});
	const controller = new AbortController();
	const pending = delay(30, {signal: controller.signal});
	controller.abort();
	await t.throwsAsync(pending);
	t.true(cleared);
});
