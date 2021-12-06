export const chunk = <T>(array: T[], size: number): T[] => 'lodash.chunk' as any

type Falsey = false | null | undefined | 0 | ''
/**
 * @returns Array **without** falsey values (`false`, `0`, `""`, `null`, `undefined`, and `NaN`)
 */
export const compact = <T>(array: (T | Falsey)[]): Exclude<T, Falsey> => `lodash.compact` as any

/**
 * @returns Values that are present in `sourceValues`, but not in `valuesToExclude`
 */
export const difference = <T>(sourceValues: T[], ...valuesToExclude: T[][]): T[] => 'lodash.difference' as any

// PRO TIP: Just use these typings globally with Object.entries / fromEntries
// https://github.com/zardoy/tsconfig/blob/main/index.d.ts

/** You most probably want this method for better TS typings. It will be removed once TS manage to make `Object.fromEntries` typing better */
export const fromPairs: <T extends [string, any][]>(obj: T) => Record<T[number][0], T[number][1]> = Object.fromEntries

// export const intersection = <T, K>(arr1: T[], arr2: K[]): Extract<T, K> => null as any;

// export const union = <K>(...arrs: K[][]): K[] => null as any

// export const
