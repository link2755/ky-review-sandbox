import test from 'ava';
import ky from '../source/index.js';

test('beforeRequest can fulfill the request without calling fetch', async t => {
	let calls = 0;
	const response = await ky('https://example.invalid', {
		retry: 0,
		async fetch() {
			calls++;
			return new Response('network');
		},
		hooks: {beforeRequest: [async () => new Response('cached')]},
	});
	t.is(await response.text(), 'cached');
	t.is(calls, 0);
});

test('an async afterResponse replacement becomes the returned body', async t => {
	const result = await ky('https://example.invalid', {
		fetch: async () => new Response('original'),
		hooks: {afterResponse: [async () => new Response('transformed')]},
	}).text();
	t.is(result, 'transformed');
});

test('beforeError replacement reaches the caller', async t => {
	const replacement = new Error('enriched error');
	await t.throwsAsync(ky('https://example.invalid', {
		retry: 0,
		fetch: async () => new Response('unavailable', {status: 503}),
		hooks: {beforeError: [async () => replacement]},
	}), {is: replacement});
});
