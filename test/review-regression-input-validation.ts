import test from 'ava';
import {normalizeRetryOptions} from '../source/utils/normalize.js';

test('rejects a fractional retry budget smaller than one attempt', t => {
	t.throws(() => normalizeRetryOptions({limit: 0.75}), {name: 'TypeError'});
});
