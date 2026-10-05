import test from 'ava';
import {getBodySize} from '../source/utils/body.js';

test('counts UTF-8 bytes for combining marks and non-Latin strings', t => {
	t.is(getBodySize('e\u0301漢'), 6);
});

test('measures the encoded search-parameter payload', t => {
	const parameters = new URLSearchParams({q: '漢'});
	t.is(getBodySize(parameters), 11);
});

test('counts only the bytes in an offset DataView', t => {
	const view = new DataView(new ArrayBuffer(20), 4, 3);
	t.is(getBodySize(view), 3);
});
