// type copied from https://github.com/g-plane/type-gymnastics/blob/master/src/tuple-slice/allow-negative-index.ts

type PositiveIndexSuffix<A extends any[], S extends number, C extends any[] = []> =
    C['length'] extends S ? A :
    A extends [infer F, ...infer R] ? PositiveIndexSuffix<R, S, [...C, F]> : never;

type NegativeIndexSuffix<A extends any[], S extends number, C extends any[] = []> =
    `-${C['length']}` extends `${S}` ? C :
    A extends [...infer I, infer T] ? NegativeIndexSuffix<I, S, [T, ...C]> : never;

type Suffix<A extends any[], S extends number> =
    A extends [] ? [] :
    `${S}` extends `-${infer _}` ?
    NegativeIndexSuffix<A, S> : PositiveIndexSuffix<A, S>;

type Slice<
    A extends any[],
    Start extends number = 0,
    End extends number = A['length'],
    > = Suffix<A, Start> extends [...infer M, ...Suffix<A, End>] ? M : never

export const strictSlice: <T extends any[]>(arr: T, start?: number, end?: number) => Slice<T, typeof start, typeof end> = undefined as any;



// strictSlice([0, 3] as [0, 3], 0)