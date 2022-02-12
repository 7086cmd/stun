"use strict";
exports.__esModule = true;
/* eslint-disable no-console */
var esbuild_1 = require("esbuild");
(0, esbuild_1.buildSync)({
    entryPoints: ['src/main.ts'],
    outfile: 'stun-cli.min.js',
    bundle: true,
    platform: 'node',
    format: 'esm',
    minify: true,
    sourcemap: true,
    target: ['node16'],
    outExtension: {
        '.js': '.min.js'
    },
    loader: {
        '.png': 'file',
        '.ts': 'ts'
    },
    logLevel: 'info',
    chunkNames: 'chunks/[name]-[hash]',
    assetNames: 'assets/[name]-[hash]',
    color: true,
    define: {
        'process.env.NODE_ENV': "'production'",
        'process.env.PRELOAD_PLACE': "'preload.js'"
    },
    banner: {
        js: '/* Copyright© 2022 7086cmd(Wu Chengyu) in Ningbo Zhenhai Jiaochuan Academy. */'
    },
    treeShaking: true,
    external: ['electron']
});
