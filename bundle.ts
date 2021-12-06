import { compilerOptions } from 'generated-module/build/ts-morph-utils'
import { Project, StructureKind } from 'ts-morph';

const project = new Project({
    compilerOptions
})

const source = project.createSourceFile('test.ts')

source.addStatements([
    {
        declarations: [
            {
                kind: StructureKind.Function,
                name: 'chunk',
                initializer
            },
        ],
    },
])