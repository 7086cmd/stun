/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { build } from 'esbuild'
import chalk from 'chalk'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import glob from 'glob'

const __dirname = resolve()
const packageFile = JSON.parse(readFileSync(resolve(__dirname, './package.json')).toString())
packageFile.main = 'dist/main.js'
writeFileSync(resolve(__dirname, './package.json'), JSON.stringify(packageFile, null, 4))
const list = [...glob.sync(`src/modules/*.*`), ...glob.sync(`src/*.*`)]
build({
    entryPoints: ['src/main.ts'],
    outfile: 'dist/stun.js',
    platform: 'node',
    format: 'esm',
    bundle: true,
    metafile: true,
    loader: {
        '.ts': 'ts',
        '.png': 'file',
    },
    external: ['eslint', 'chalk', 'shelljs', 'prompts', 'commander', 'prettier', 'esbuild', 'vite', 'vitepress', 'glob'],
    watch: {
        onRebuild: (error, result) => {
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
        'process.env.PRELOAD_PLACE': "'preload.js'",
    },
    mainFields: ['main', 'module'],
    banner: {
        js: '/* eslint disable*/',
    },
})
