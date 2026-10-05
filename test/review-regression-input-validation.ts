import test from 'ava';
import {normalizeRetryOptions} from '../source/utils/normalize.js';
import {validateAndMerge} from '../source/utils/merge.js';

test('rejects a fractional retry budget smaller than one attempt', t => {
	t.throws(() => normalizeRetryOptions({limit: 0.75}), {name: 'TypeError'});
});

test('rejects a negative shorthand retry limit', t => {
	t.throws(() => normalizeRetryOptions(-1), {name: 'TypeError'});
});

test('rejects an array passed as the options container', t => {
	t.throws(() => validateAndMerge([{timeout: 20}] as never), {name: 'TypeError'});
});

test('rejects an array supplied as request context', t => {
	t.throws(() => validateAndMerge({context: ['unexpected']} as never), {name: 'TypeError'});
});
