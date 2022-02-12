/* eslint-disable @typescript-eslint/no-explicit-any */
import { mkdirSync, writeFileSync, existsSync, readdirSync, statSync, copyFileSync } from 'fs'
import { resolve } from 'path'
import { cwd } from 'process'
import chalk from 'chalk'
import fetch from 'node-fetch'
import prompts from 'prompts'

const __dirname = resolve()

const generateMainTS = (base: string) => {
    const mainTS = `import { resolve } from 'path'

console.log('Hello, World!')
console.log('App is running in ' + resolve())
console.log('Proundly use stun.js!')`
    writeFileSync(resolve(base, 'src', 'main.ts'), mainTS)
}

const copyDir = (src: string, dest: string) => {
    if (!existsSync(src)) {
        return
    }
    if (!existsSync(dest)) {
        mkdirSync(dest)
    }

    const dir = readdirSync(src)
    dir.forEach((item) => {
        const itemPath = resolve(src, item)
        const lstType = statSync(itemPath)
        if (lstType.isFile()) {
            copyFileSync(itemPath, resolve(dest, item))
        } else if (lstType.isDirectory()) {
            copyDir(itemPath, resolve(dest, item))
        }
    })
}

const generateReadme = (base: string, config: any) => {
    const readme = `# ${config.name}\n${config.description}`
    writeFileSync(resolve(base, './README.md'), readme)
}

const generatePrettierRC = (base: string) => {
    const prettierrc = {
        arrowParens: 'always',
        bracketSameLine: false,
        bracketSpacing: true,
        embeddedLanguageFormatting: 'auto',
        htmlWhitespaceSensitivity: 'css',
        insertPragma: false,
        jsxSingleQuote: true,
        proseWrap: 'preserve',
        quoteProps: 'as-needed',
        requirePragma: false,
        semi: false,
        singleQuote: true,
        tabWidth: 4,
        trailingComma: 'es5',
        useTabs: false,
        vueIndentScriptAndStyle: true,
        printWidth: 200,
    }
    writeFileSync(resolve(base, './.prettierrc.json'), JSON.stringify(prettierrc, null, 4))
}

const generateESLintRC = (base: string) => {
    const eslintrc = {
        env: {
            es2021: true,
            node: true,
            serviceworker: true,
            browser: true,
        },
        extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:vue/essential', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended'],
        parser: 'vue-eslint-parser',
        parserOptions: {
            parser: '@typescript-eslint/parser',
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
        },
        plugins: ['@typescript-eslint', 'prettier', 'vue'],
        rules: {
            semi: 0,
            'no-console': 2,
            'prettier/prettier': [
                'error',
                {
                    arrowParens: 'always',
                    bracketSameLine: false,
                    bracketSpacing: true,
                    embeddedLanguageFormatting: 'auto',
                    htmlWhitespaceSensitivity: 'css',
                    insertPragma: false,
                    jsxSingleQuote: true,
                    proseWrap: 'preserve',
                    quoteProps: 'as-needed',
                    requirePragma: false,
                    semi: false,
                    singleQuote: true,
                    tabWidth: 4,
                    trailingComma: 'es5',
                    useTabs: false,
                    vueIndentScriptAndStyle: true,
                    printWidth: 200,
                },
                {
                    usePrettierrc: true,
                },
            ],
            'prefer-const': 0,
            'vue/html-indent': 0,
            'vue/html-self-closing': 0,
            'vue/max-attributes-per-line': 0,
            'vue/multi-word-component-names': 0,
            'vue/singleline-html-element-content-newline': 0,
            'vue/no-v-model-argument': 0,
        },
    }
    writeFileSync(resolve(base, './.eslintrc.json'), JSON.stringify(eslintrc, null, 4))
}

const generateIgnoreFiles = (base: string) => {
    const ignores = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`
    writeFileSync(resolve(base, './.eslintignore'), ignores)
    writeFileSync(resolve(base, './.npmignore'), ignores)
    writeFileSync(resolve(base, './.prettierignore'), ignores)
    writeFileSync(resolve(base, './.gitignore'), ignores)
}

const generatePackageJson = (base: string, config: any) => {
    const packageFile = {
        ...config,
        main: 'src/main.ts',
        repository: {
            type: 'git',
            url: `git+ssh://git@github.com/${config.author}/${config.name}.git`,
        },
        bugs: {
            url: `https://github.com/${config.author}/${config.name}/issues`,
        },
        homepage: `https://github.com/${config.author}/${config.name}#readme`,
        devDependencies: {
            '@types/eslint': '^8.2.1',
            '@types/glob': '^7.2.0',
            '@types/prompts': '^2.0.14',
            '@typescript-eslint/eslint-plugin': '^5.8.1',
            '@typescript-eslint/parser': '^5.8.1',
            'eslint-plugin-prettier': '^4.0.0',
            'node-fetch': '^3.1.0',
            prettier: '^2.5.1',
            typescript: '^4.5.4',
            esbuild: '^0.14.10',
            eslint: '^8.6.0',
            glob: '^7.2.0',
            vite: '^2.7.10',
            vitepress: '^0.20.10',
            '@vitejs/plugin-vue': '^2.0.0',
            'vue-tsc': '^0.29.8',
            'vite-plugin-style-import': '^1.4.0',
            vue: '^3.2.26',
            'vue-eslint-parser': '^8.0.1',
            'vue-i18n': '^9.2.0-beta.23',
            'vue-router': '^4.0.12',
            vuex: '^4.0.2',
            'eslint-plugin-vue': '^8.2.0',
        },
    }
    writeFileSync(resolve(base, './package.json'), JSON.stringify(packageFile, null, 4))
}

const generateTSConfig = (base: string) => {
    const tsconfig = {
        compilerOptions: {
            target: 'esnext',
            useDefineForClassFields: true,
            module: 'esnext',
            moduleResolution: 'node',
            strict: true,
            jsx: 'preserve',
            sourceMap: true,
            resolveJsonModule: true,
            esModuleInterop: true,
            types: [],
            baseUrl: './',
            suppressImplicitAnyIndexErrors: true,
            lib: ['esnext', 'dom'],
        },
        include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.vue'],
    }
    writeFileSync(resolve(base, './tsconfig.json'), JSON.stringify(tsconfig, null, 4))
}

export default () => {
    prompts([
        {
            type: 'text',
            message: 'Project Name',
            name: 'name',
        },
        {
            type: 'text',
            message: 'Project Version',
            name: 'version',
        },
        {
            type: 'text',
            message: 'Project Description',
            name: 'description',
        },
        {
            type: 'list',
            name: 'keywords',
            message: 'Keywords',
            initial: '',
            separator: ',',
        },
        {
            type: 'text',
            message: 'Author',
            name: 'author',
        },
        {
            type: 'text',
            message: 'License',
            name: 'license',
        },
    ]).then(async (response) => {
        const license: any = await (await fetch(`https://api.github.com/licenses/${response.license}`)).json()
        if (license.body == undefined) {
            console.error(chalk.red('You can not connect to https://api.github.com. We can not download the license file.'))
            prompts({
                type: 'confirm',
                name: 'still',
                message: 'Still create the project?',
                initial: true,
            }).then(async (still) => {
                if (still.still) {
                    generate()
                } else {
                    console.error(chalk.red('You exited the createment'))
                    process.exit(1)
                }
            })
        } else {
            generate()
        }
        function generate() {
            const base = resolve(cwd(), response.name)
            mkdirSync(base)
            console.log(chalk.yellow('Generating ' + chalk.bold(`package.json`) + '...'))
            generatePackageJson(base, response)
            if (license.body !== undefined) {
                console.log(chalk.yellow('Generating ' + chalk.bold(`LICENSE`) + '...'))
                writeFileSync(resolve(base, './LICENSE'), license.body)
            }
            mkdirSync(resolve(base, 'src'))
            mkdirSync(resolve(base, 'docs'))
            mkdirSync(resolve(base, 'src', 'pages'))
            mkdirSync(resolve(base, 'test'))
            mkdirSync(resolve(base, 'public'))
            console.log(chalk.yellow('Installizating ' + chalk.bold(`vite`) + '...'))
            copyFileSync(resolve(__dirname, 'template-vue-ts', 'vite.config.ts'), resolve(cwd(), response.name, 'vite.config.ts'))
            copyFileSync(resolve(__dirname, 'template-vue-ts', 'index.html'), resolve(cwd(), response.name, 'index.html'))
            copyDir(resolve(__dirname, 'template-vue-ts', 'src'), resolve(cwd(), response.name, 'src', 'pages'))
            console.log(chalk.yellow('Generating ' + chalk.bold(`tsconfig.json`) + '...'))
            generateTSConfig(base)
            console.log(chalk.yellow('Generating ' + chalk.bold(`src/main.ts`) + '...'))
            generateMainTS(base)
            console.log(chalk.yellow('Generating ' + chalk.bold(`ignores`) + '...'))
            generateIgnoreFiles(base)
            console.log(chalk.yellow('Generating ' + chalk.bold(`.eslintrc.json`) + '...'))
            generateESLintRC(base)
            console.log(chalk.yellow('Generating ' + chalk.bold(`.prettierrc.json`) + '...'))
            generatePrettierRC(base)
            console.log(chalk.yellow('Generating ' + chalk.bold(`README.md`) + '...'))
            generateReadme(base, response)
            console.log(chalk.green('Create ' + chalk.bold(response.name) + ' successfully!'))
            console.log()
            console.log(chalk.greenBright(`$ cd ${response.name}\n$ pnpm install`))
            console.log()
            console.log(chalk.green(`to installize your project.`))
        }
    })
}
