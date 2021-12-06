import { chunk, compact, difference, fromPairs, union } from '../src'
import { expectType } from 'tsd'

const t1 = chunk([1, 2], 1)
expectType<number[]>(t1)

const t2 = compact([0, '', null, undefined, false])
expectType<never>(t2)

const t3 = compact([0, 'Hey', 20, true, false])
expectType<true | 'Hey' | 20>(t3)

const t4 = difference([1, 2, 3], [2, 4])
expectType<number[]>(t4)

// Isn't ideal though
const t5 = fromPairs([
    ['count', 5],
    ['type', 'user'],
])
expectType<Record<string, string | number>>(t5)

// const t6 = intersection(["1", "2"], ["2", 3])

//@ts-expect-error lodash would allow strings, but we don't
union('fdsf')

const t7 = union([324, 'hey'], [true, 'hey'])

const d = 'hey' as const
