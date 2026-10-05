import test from 'ava';
import {streamResponse} from '../source/utils/body.js';

const withMetadata = () => {
	const response = new Response('payload');
	Object.defineProperties(response, {
		url: {value: 'https://example.invalid/final'},
		redirected: {value: true},
		type: {value: 'cors'},
	});
	return response;
};

test('download progress preserves the effective response URL', async t => {
	const response = streamResponse(withMetadata(), () => {
		// Observe progress without changing the response body.
	});
	t.is(response.url, 'https://example.invalid/final');
	await response.text();
});
