import { RambdaTypes, type } from 'rambda'
import lCompact from 'lodash.compact'

// array

type Falsey = false | null | undefined | 0 | ''

export const findCustomArray = <T, R>(array: T[], predicate: (item: T, index: number, array: T[]) => R): Exclude<R, Falsey> | undefined => {
    let lastResult: R | undefined
    const foundElem = array.find((item, index, array) => {
        lastResult = predicate(item, index, array)
        return lastResult
    })
    if (foundElem) return lastResult as Exclude<R, Falsey>
    return undefined
}

/**
 * @returns Array **without** falsey values (`false`, `0`, `""`, `null`, `undefined`, and `NaN`)
 */
export const compact = <T>(array: (T | Falsey)[]): Exclude<T, Falsey>[] => lCompact(array)

export const oneOf = <T, K extends T>(value: T, ...values: [K, ...K[]]): value is K => values.includes(value as any)

export const ensureArray = <T>(arg: T | T[]): T[] => (Array.isArray(arg) ? arg : [arg])

/**
 * @param fields `undefined` values will be ignored!
 */
export const findByFields = <T extends Record<string, any>>(arr: T[], fields: Partial<T>) => {
    const filteredFields = filterObjUndefined(fields)
    return arr.find(item => Object.entries(filteredFields).every(([prop, value]) => item[prop] === value))
}

// object

const filterObjUndefined = (obj: Record<string, any>) => Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined))

export function assignDefined<T extends Record<string, any>, K extends Partial<T>>(
    target: T,
    properties: K,
): asserts target is T & typeof properties {
    Object.assign(target, filterObjUndefined(properties))
}

export const ensureHasProp = <T extends Record<string, any>, K extends keyof T>(obj: T, key: K, initValue: T[K]) => {
    if (!(key in obj)) obj[key] = initValue
    return obj[key]!
}

// misc

/** @throws if not expected */
export const ensureType = (expectedType: RambdaTypes, name?: string) => {
    const actualType = type(expectedType)
    if (actualType === expectedType) return
    throw new Error(`Expected type ${expectedType}${templateIf(name, ` from ${name}`)}. Got ${actualType}`)
}

// string

/** String if. Previously named as strIf */
export const templateIf = (condition: any, string: string) => (condition ? string : '')

export const stringTrimUntil = (input: string, char: string) => {
    const charIndex = input.indexOf(char)
    return charIndex === -1 ? input : input.slice(0, charIndex)
}

export const clipByLastIndex = (input: string, chars: string[]) => {
    for (const char of chars) {
        const index = input.lastIndexOf(char)
        input = /* clip exclusively */ input.slice(index === -1 ? 0 : index + 1)
    }

    return input
}

/**
 * @param regexps Must have a least one capture group
 */
export const clipByRegexps = (input: string, regexps: RegExp[]) => {
    for (const regexp of regexps) input = input.match(regexp)?.[1] ?? input
    return input
}

export const lowerCaseFirst = (input: string) => input[0]!.toLowerCase() + input.slice(1)

// other

export { omitObj, pickObj } from './pickOmit'

export * from './stringWithPositions'
