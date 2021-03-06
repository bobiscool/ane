fis.hook('commonjs', {
    extList: ['.js', '.ts']
});

fis.set('project.ignore', ['node_modules/**', 'output/**', '.git/**', 'fis-conf.js',
                            'README.md', 'karma.conf.js', 'package.json', 'LICENSE']);
fis.set('baseurl', '');

fis.unhook('components');
fis.hook('node_modules', {
    ignoreDevDependencies: false,
    shimBuffer: false,
    shimProcess: false,
    shutup: true
});

fis
.match('**', {
    release: false,
    useHash: false
})
.match('**.ts', {
    preprocessor: fis.plugin('js-require-css'),
    parser: fis.plugin('typescript', {
        jsx: 1,
        showNotices: false,
        sourceMap: false,
        target: 0,
        allowSyntheticDefaultImports: true
    }),
    rExt: '.js'
})
.match('{**.scss,*.html:scss}', {
    parser: fis.plugin('node-sass', {
    }),
    rExt: '.css'
})
.match('/node_modules/**/*.{ts,js}', {
    isMod: true,
    release: '/$0'
})
.match('/components/**/*.{ts,js}', {
    isMod: true,
    release: '/$0'
})
.match('/*.ts', {
    isMod: true,
    release: '/$0'
})
.match('/components/**/*.html', {
    postprocessor: fis.plugin('component-view', { })
})
.match('/components/**/*.scss', {
    release: '/$0'
})
.match('/{node_modules,components}/**/*.{css,scss,eot,svg,ttf,woff,woff2,map}', {
    release: '/$0'
})
.match('/styles/**.{css,scss,eot,svg,ttf,woff,woff2,map}', {
    release: '/$0'
})
.match('{ane.js,vendor.js,app.js,app.css}', {
    release: '/$0'
})
.match('{**.js.map,**.css.map}', {
    release: '/$0'
})
.match('/components/**/test/*.html', {
    postprocessor: undefined,
    release: '/$0'
})
.match('/components/ms-input/test/*.html', {
    postprocessor: fis.plugin('component-view', { }),
    release: '/$0'
})
.match('/tests/**', {
    release: '/$0'
})
.match('/tests/index.js', {
    isMod: true
})
.match('::package', {
    packager: fis.plugin('deps-pack', {
        useSourceMap: true,
        // 'ane.js': [
        //     'index.ts',
        //     'index.ts:deps',
        //     '!node_modules/**',
        //     '!node_modules/**:deps'
        // ],
        // 'vendor.js': [
        //     'node_modules/**',
        //     'node_modules/**:deps',
        // ],
        // 'app.js': [
        //     'tests/index.js',
        //     '!tests/mod.js'
        // ],
        // 'app.css': [
        //     'components/**.{css,scss}',
        //     'components/**.{css,scss}:deps'
        // ]
    }),
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true,
        obtainStyle: false
    })
});