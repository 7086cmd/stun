/* eslint-disable no-console */
import { build as buildFrontEnd } from 'vite'
import { build as buildBackEnd } from 'esbuild'
import { cwd } from 'process'
import { resolve } from 'path'
import lint from './lint'

const build = async () => {
    await lint('src', '.ts')
    await lint('src', '.vue')
    await lint('src', '.js')
    await buildBackEnd({
        entryPoints: [resolve(cwd(), 'src/main.ts')],
        outdir: resolve(cwd(), 'dist'),
        bundle: true,
        platform: 'node',
        format: 'cjs',
        minify: true,
        sourcemap: true,
        target: ['node16'],
        outExtension: {
            '.js': '.min.js',
        },
        loader: {
            '.png': 'file',
            '.ts': 'ts',
        },
        logLevel: 'info',
        chunkNames: 'chunks/[name]-[hash]',
        assetNames: 'assets/[name]-[hash]',
        color: true,
        define: {
            'process.env.NODE_ENV': "'production'",
        },
        banner: {
            js: '/* generate by stun(7086cmd) */',
        },
        treeShaking: true,
        external: ['electron'],
    })
    await buildBackEnd({
        entryPoints: [resolve(cwd(), 'src/preload.ts')],
        outdir: resolve(cwd(), 'dist'),
        bundle: true,
        platform: 'node',
        format: 'cjs',
        minify: true,
        sourcemap: true,
        target: ['node16'],
        outExtension: {
            '.js': '.min.js',
        },
        loader: {
            '.png': 'file',
            '.ts': 'ts',
        },
        logLevel: 'info',
        chunkNames: 'chunks/[name]-[hash]',
        assetNames: 'assets/[name]-[hash]',
        color: true,
        define: {
            'process.env.NODE_ENV': "'production'",
        },
        banner: {
            js: '/* generate by stun(7086cmd) */',
        },
        treeShaking: true,
        external: ['electron'],
    })
    await buildBackEnd({
        entryPoints: [resolve(cwd(), 'src/client/main.js')],
        outdir: resolve(cwd(), 'dist'),
        bundle: true,
        platform: 'node',
        format: 'cjs',
        minify: true,
        sourcemap: true,
        target: ['node16'],
        outExtension: {
            '.js': '.client.min.js',
        },
        loader: {
            '.png': 'file',
            '.ts': 'ts',
        },
        logLevel: 'info',
        chunkNames: 'chunks/[name]-[hash]',
        assetNames: 'assets/[name]-[hash]',
        color: true,
        define: {
            'process.env.NODE_ENV': "'production'",
        },
        banner: {
            js: '/* generate by stun(7086cmd) */',
        },
        treeShaking: true,
        external: ['electron'],
    })
    await buildBackEnd({
        entryPoints: [resolve(cwd(), 'src/client/preload.ts')],
        outdir: resolve(cwd(), 'dist'),
        bundle: true,
        platform: 'node',
        format: 'cjs',
        minify: true,
        sourcemap: true,
        target: ['node16'],
        outExtension: {
            '.js': '.client.min.js',
        },
        loader: {
            '.png': 'file',
            '.ts': 'ts',
        },
        logLevel: 'info',
        chunkNames: 'chunks/[name]',
        assetNames: 'assets/[name]',
        color: true,
        define: {
            'process.env.NODE_ENV': "'production'",
        },
        banner: {
            js: '/* generate by stun(7086cmd) */',
        },
        treeShaking: true,
        external: ['electron'],
    })
    await buildFrontEnd()
}
export default build
