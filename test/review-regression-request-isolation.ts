import test from 'ava';
import {cloneShallow} from '../source/utils/merge.js';

test('shallow array copies do not share later pushes', t => {
	const original = ['initial'];
	const copy = cloneShallow(original);
	copy.push('next');
	t.deepEqual(original, ['initial']);
});
