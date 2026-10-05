import test from 'ava';
import {cloneDeep, cloneShallow} from '../source/utils/merge.js';

test('shallow array copies do not share later pushes', t => {
	const original = ['initial'];
	const copy = cloneShallow(original);
	copy.push('next');
	t.deepEqual(original, ['initial']);
});

test('cloned search parameters can be updated independently', t => {
	const original = new URLSearchParams('page=1');
	const copy = cloneShallow(original);
	copy.set('page', '2');
	t.is(original.get('page'), '1');
});

test('deep copies isolate objects nested inside arrays', t => {
	const original = [{attempt: 1}];
	const copy = cloneDeep(original);
	copy[0]!.attempt = 2;
	t.is(original[0]!.attempt, 1);
});
