import test from 'ava';
import {cloneShallow} from '../source/utils/merge.js';

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
