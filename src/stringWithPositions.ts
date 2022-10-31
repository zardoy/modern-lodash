import escapeStringRegexp from 'escape-string-regexp'

export const stringWithPositions = <T extends string>(contents: string, replacements: T[]): [contents: string, positions: Record<T, number[]>] => {
    const cursorPositions = Object.fromEntries(replacements.map(replacement => [replacement, []])) as Record<string, number[]>
    const regex = new RegExp(`(?:${replacements.map(replacement => `(${escapeStringRegexp(replacement)})`).join('|')})`)
    let currentMatch: RegExpExecArray | null | undefined
    while ((currentMatch = regex.exec(contents))) {
        const offset = currentMatch.index
        const matchLength = currentMatch[0]!.length
        contents = contents.slice(0, offset) + contents.slice(offset + matchLength)
        for (const [i, val] of currentMatch.slice(1).entries()) {
            if (!val) continue
            cursorPositions[replacements[i]!]!.push(offset)
            break
        }
    }
    return [contents, cursorPositions]
}
