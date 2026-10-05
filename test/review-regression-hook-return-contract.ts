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
