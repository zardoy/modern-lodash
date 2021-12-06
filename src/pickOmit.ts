import { pick, omit } from 'rambda'

interface PickObj {
    <
        T extends Record<string, any>,
        K1 extends keyof T,
        K2 extends Exclude<keyof T, K1> = never,
        K3 extends Exclude<keyof T, K1 | K2> = never,
        K4 extends Exclude<keyof T, K1 | K2 | K3> = never,
        K5 extends Exclude<keyof T, K1 | K2 | K3 | K4> = never,
        K6 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5> = never,
        K7 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5 | K6> = never,
        K8 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5 | K6 | K7> = never,
        K9 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8> = never,
        K10 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9> = never,
        K11 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10> = never,
    >(
        obj: T,
        ...props: [K1, K2?, K3?, K4?, K5?, K6?, K7?, K8?, K9?, K10?, K11?]
    ): Pick<T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11>
    // shallow
    <T extends Record<string, any>, K extends Partial<Record<keyof T, boolean>>>(obj: T, pickKeys: K): Pick<T, keyof K & keyof T>
}

export const pickObj: PickObj = (obj, ...props) => {
    if (typeof props[0] === 'object') return pick(Object.keys(props[0]), obj)
    return pick(props as any, obj) as any
}

interface OmitObj {
    <
        T extends Record<string, any>,
        K1 extends keyof T,
        K2 extends Exclude<keyof T, K1> = never,
        K3 extends Exclude<keyof T, K1 | K2> = never,
        K4 extends Exclude<keyof T, K1 | K2 | K3> = never,
        K5 extends Exclude<keyof T, K1 | K2 | K3 | K4> = never,
        K6 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5> = never,
        K7 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5 | K6> = never,
        K8 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5 | K6 | K7> = never,
        K9 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8> = never,
        K10 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9> = never,
        K11 extends Exclude<keyof T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10> = never,
    >(
        obj: T,
        ...props: [K1, K2?, K3?, K4?, K5?, K6?, K7?, K8?, K9?, K10?, K11?]
    ): Omit<T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11>
    // shallow
    <T extends Record<string, any>, K extends Partial<Record<keyof T, boolean>>>(obj: T, omitKeys: K): Omit<T, keyof K & keyof T>
}

export const omitObj: OmitObj = (obj, ...props) => {
    if (typeof props[0] === 'object') return omit(Object.keys(props[0]), obj)
    return omit(props as any, obj) as any
}
