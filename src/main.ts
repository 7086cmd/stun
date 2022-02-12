import { Command } from 'commander'

import lint from './modules/lint'
import lintfix from './modules/lintfix'
import create from './modules/create'
import serve from './modules/serve'
import build from './modules/build'

const program = new Command()

program.version('1.0.0')

program
    .command('lint <folder> <ext>')
    .option('-f, --fix', 'Fix fixable problems.')
    .action((folder, ext, options) => {
        if (options.fix == true) {
            lintfix(folder, ext)
        } else {
            lint(folder, ext)
        }
    })

program.command('create').action(() => {
    create()
})

program.command('serve').action(() => {
    serve()
})

program.command('build').action(() => {
    build()
})

program.parse(process.argv)
