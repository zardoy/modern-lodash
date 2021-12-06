import { Except } from 'type-fest'
import _ from 'lodash'

type LodashMethods = keyof Omit<Except<typeof _, 'VERSION' | 'templateSettings'>, `sorted${string}`>

type Category = 'arrays' | 'arrays-of-items' | 'object' | 'string'

type MethodsOld = {
    [category in Category]: Record<
        string,
        {
            type: 'lodash' | 'lodash-typed' | 'original'
        }
    > & {
        /** Markdown */
        description: string
    }
}

type LodashMethodsMap = {
    [method in LodashMethods]: (
        | {
              // feature is
              type: 'has-native'
              nativeReplacement: string | string[]
          }
        | {
              // rambda has (probably with different arg order)
              type: 'has-rambda'
              rambdaMethod: string
          }
        | {
              type: // probably leaved as is. One typing. Probably compatible with original
              | 'reexport'
                  // Reexport with typings adjustments. Probably incompatible method, but lodash typings would fail at type-checking. Has improved (and more strict) typing
                  | 'reexport-typing'
                  // brand new
                  | 'original'
          }
        | {
              type: 'not-needed'
              alternatives: string[]
          }
    ) & {
        /** Only when no export, otherwise place in JSDoc */
        note?: string
        /** Exported name, if not the same */
        alias?: string
        additionalVariants?: {
            by?: true
            with?: true
            sorted?: true
        }
    }
}

// TODO:
// 1. Automatically link `-By` methods

export const methods: Methods = {
    arrays: {
        description: 'Methods for working with arrays directly e.g. `_.difference(arr1, arr2)`',
        chunk: {
            type: 'lodash',
        },
        compact: {
            type: 'lodash',
        },
        difference: {
            type: 'lodash',
        },
    },
    'arrays-of-items': {
        description: 'Methods for working with items of arrays (usually have By postfix) e.g.',
    },
}

// https://github.com/lodash/lodash/tree/4.5.0-npm-packages/lodash.[package]

// ? has-native methods aren't available directly. only via chain(value)

export const lodashMethodsMap: LodashMethodsMap = {
    chunk: {
        type: 'reexport-typing',
    },
    compact: {
        type: 'reexport-typing',
    },
    concat: {
        type: 'has-native',
        nativeReplacement: '[].concat',
    },
    difference: {
        type: 'reexport',
    },
    differenceBy: {
        type: '',
    },
    drop: {
        type: 'has-native',
        nativeReplacement: '[].slice(n)',
    },
    dropRight: {
        type: 'has-native',
        nativeReplacement: '[].slice(0, -n)',
    },
    dropRightWhile: {},
    dropWhile: {},
    fill: {},
    findIndex: {
        type: 'has-native',
        nativeReplacement: ['[].findIndex', '[].slice(fromIndex).findIndex'],
    },
    findLastIndex: {
        // TODO investigate
        type: 'reexport',
    },
    flatten: {
        type: 'has-native',
        nativeReplacement: '[].flat()',
    },
    flattenDeep: {
        type: 'has-native',
        nativeReplacement: '[].flat(Infinity)',
    },
    flattenDepth: {
        type: 'has-native',
        nativeReplacement: '[].flat(depth)',
    },
    fromPairs: {
        type: 'reexport-typing',
        // nativeReplacement: 'Object.fromEntries(array)',
    },
    head: {
        type: 'has-native',
        nativeReplacement: 'array[0]',
    },
    indexOf: {
        type: 'has-native',
        nativeReplacement: '[].indexOf',
    },
    initial: {
        type: 'has-native',
        nativeReplacement: '[].slice(0, -1)',
    },
    intersection: {
        type: 'reexport',
    },
    intersectionBy: {},
    intersectionWith: {},
    join: {
        type: 'has-native',
        nativeReplacement: '[].join',
    },
    last: {
        type: 'has-native',
        nativeReplacement: ['[].at(-1)', '[].slice(-1)[0]'],
    },
    lastIndexOf: {
        type: 'has-native',
        nativeReplacement: '[].lastIndexOf',
    },
    nth: {
        type: 'has-native',
        nativeReplacement: '[].at(n)',
    },
    pull: {
        type: 'reexport',
        alias: 'removeItemMutate',
    },
    pullAll: {
        type: 'not-needed',
        alternatives: ['removeMutate(array, ...values)'],
    },
    pullAt: {
        type: 'reexport',
        alias: 'removeAtMutate', // removeMutateAt(array, indexes)
    },
    remove: {
        type: 'reexport',
        alias: 'removeMutate',
    },
    reverse: {
        type: 'has-native',
        nativeReplacement: '[].reverse',
    },
    slice: {
        type: 'reexport-typing',
        // nativeReplacement: '[].slice'
    },
    sortedIndex: {
        type: 'reexport',
        // investigate
    },
    // sortedIndexBy: {
    //     type: 'reexport'
    // },
    tail: {
        type: 'has-native',
        nativeReplacement: '[].slice(1)',
    },
    take: {
        type: 'has-native',
        nativeReplacement: '[].slice(0, n)',
    },
    takeRight: {
        type: 'has-native',
        nativeReplacement: '[].slice(-n)',
    },
    takeWhile: {
        type: 'reexport',
    },
    takeRightWhile: {
        type: 'reexport',
    },
    union: {
        type: 'reexport-typing',
        // review
    },
    uniq: {
        type: 'reexport-typing',
        // review
    },
    some: {
        type: 'has-native',
        nativeReplacement: '[].some',
    },
    shuffle: {
        type: 'reexport',
    },
    sampleSize: {
        type: 'reexport-typing',
        alias: 'randomItems',
    },
    random: {
        type: 'reexport',
        alias: 'randomInt',
    },
    sample: {
        type: 'reexport',
        alias: 'randomItem',
    },
    size: {
        type: 'reexport',
    },
    sortBy: {
        /* CHECK */
    },
    defaultsDeep: {
        // type: "reexport-typing"
        alias: 'mergeDeep',
    },
}

// TODO add https://github.com/ksxnodemodules/ts-pipe-compose
const brandNew = ['randomFloat', 'randomObjKey', 'randomObjProp', 'mapAndCompact']
