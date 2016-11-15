gulpPaths = {
    src : {
        assets : {
            images : './assets/images/**/*',
            jsClient : './assets/js-local/**/*',
            jsVendor : './assets/js-vendor/**/*',
            scssAll : './assets/scss/**/*',
            scssApp : './assets/scss/*.scss'
        },
        spec : 'spec/**/*-spec.js',
        appJs : './app/**/*.js',
        appHtml: './app/**/*.html'
    },
    dest : {
        root : './public',
        js : './public/javascript',
        css : './public/stylesheets',
        images : './public/images'
    }
};


