import test from 'ava';
import {getBodySize} from '../source/utils/body.js';

test('counts UTF-8 bytes for combining marks and non-Latin strings', t => {
	t.is(getBodySize('e\u0301漢'), 6);
});

test('measures the encoded search-parameter payload', t => {
	const parameters = new URLSearchParams({q: '漢'});
	t.is(getBodySize(parameters), 11);
});
