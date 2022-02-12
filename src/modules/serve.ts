/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { build } from 'esbuild'
import { cwd } from 'process'
import { resolve } from 'path'
import { createServer } from 'vite'
import chalk from 'chalk'
import glob from 'glob'

import lint from './lint'

const list = [
    ...glob.sync(resolve(cwd(), './src/modules/**/*.*')),
    ...glob.sync(resolve(cwd(), './src/modules/*.*')),
    ...glob.sync(resolve(cwd(), './src/client/**/*.*')),
    ...glob.sync(resolve(cwd(), './src/client/*.*')),
    resolve(cwd(), './src/*.*'),
]
export default async () => {
    await lint('src', '.ts')
    await lint('src', '.vue')
    await lint('src', '.js')
    build({
        entryPoints: list,
        outdir: resolve(cwd(), 'dist'),
        platform: 'node',
        format: 'cjs',
        loader: {
            '.ts': 'ts',
            '.png': 'file',
        },
        external: ['electron'],
        watch: {
            onRebuild: (error) => {
                if (error) {
                    console.log(chalk.red('Build Failed: ' + error.message))
                }
            },
        },
        target: ['node16'],
        outExtension: {
            '.js': '.js',
        },
        logLevel: 'debug',
        chunkNames: 'chunks/[name]-[hash]',
        assetNames: 'assets/[name]-[hash]',
        color: true,
        define: {
            'process.env.NODE_ENV': "'development'",
        },
        mainFields: ['main', 'module'],
        banner: {
            js: '/* generate by stun(7086cmd) */',
        },
    })
    const server = await createServer()
    await server.listen()
    server.printUrls()
}
