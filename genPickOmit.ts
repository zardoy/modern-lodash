import fs from 'fs'
import { range } from 'rambda'
// template

const kMax = 12
const genK = (start: number, end: number) => range(start, end).map(i => `K${i}`)

const parts = {
    extends: '',
    props: genK(2, kMax)
        .map(s => `${s}?`)
        .join(', '),
    out: genK(1, kMax).join(' | '),
}

for (const i of range(2, kMax)) {
    const prevK = genK(1, i)
    const curExtends = `\tK${i} extends Exclude<keyof T, ${prevK.join(' | ')}> = never,\n`
    parts.extends += curExtends
}

const getFuncTempl = (method: 'pick' | 'omit', type: 'Pick' | 'Omit') =>
    `
interface ${type}Obj {
    <
        T extends Record<string, any>,
        K1 extends keyof T,
        ${parts.extends}
    >(
        obj: T,
        ...props: [K1, ${parts.props}]
    ): ${type}<T, ${parts.out}>
    // shallow
    <T extends Record<string, any>, K extends Partial<Record<keyof T, boolean>>>(obj: T, ${method}Keys: K): ${type}<T, keyof K & keyof T>
}

export const ${method}Obj: ${type}Obj = (obj, ...props) => {
    if (typeof props[0] === 'object') return ${method}(Object.keys(props[0]), obj)
    return ${method}(props as any, obj) as any
}
`

fs.writeFileSync(
    './src/pickOmit.ts',
    `
import { pick, omit } from 'rambda'

${getFuncTempl('pick', 'Pick')}
${getFuncTempl('omit', 'Omit')}
`,
    'utf-8',
)
