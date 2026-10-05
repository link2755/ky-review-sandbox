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

test.serial('completed delays detach the abort listener', async t => {
	const controller = new AbortController();
	const original = controller.signal.removeEventListener.bind(controller.signal);
	let removed = false;

	controller.signal.removeEventListener = (...arguments_: Parameters<AbortSignal['removeEventListener']>) => {
		removed = true;
		original(...arguments_);
	};

	await delay(1, {signal: controller.signal});
	t.true(removed);
});
