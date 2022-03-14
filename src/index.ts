import { RambdaTypes, type } from 'rambda'
import lCompact from 'lodash.compact'

type Falsey = false | null | undefined | 0 | ''
/**
 * @returns Array **without** falsey values (`false`, `0`, `""`, `null`, `undefined`, and `NaN`)
 */
export const compact = <T>(array: (T | Falsey)[]): Exclude<T, Falsey> => lCompact(array)

/** String if. Previously named as strIf */
export const templateIf = (condition: any, string: string) => (condition ? string : '')

export const oneOf = <T, K extends T>(value: T, ...values: [K, ...K[]]): value is K => values.includes(value as any)

export const ensureArray = <T>(arg: T | T[]): T[] => (Array.isArray(arg) ? arg : [arg])

const filterObjUndefined = (obj: Record<string, any>) => Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined))

export function assignDefined<T extends Record<string, any>, K extends Partial<T>>(
    target: T,
    properties: K,
): asserts target is T & typeof properties {
    Object.assign(target, filterObjUndefined(properties))
}

/**
 * @param fields `undefined` values will be ignored!
 */
export const findByFields = <T extends Record<string, any>>(arr: T[], fields: Partial<T>) => {
    const filteredFields = filterObjUndefined(fields)
    return arr.find(item => Object.entries(filteredFields).every(([prop, value]) => item[prop] === value))
}

/** @throws if not expected */
export const ensureType = (expectedType: RambdaTypes, name?: string) => {
    const actualType = type(expectedType)
    if (actualType === expectedType) return
    throw new Error(`Expected type ${expectedType}${templateIf(name, ` from ${name}`)}. Got ${actualType}`)
}

export { omitObj, pickObj } from './pickOmit'
