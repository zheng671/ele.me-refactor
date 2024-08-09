module.exports = function () {
    var temp = '.tmp/';
    var build = 'build/';
    var src = 'src/';
    var app = src + 'app/';
    var component = src + 'components/';
    var asset = src + 'asset/';
    var less = asset + 'less/';

    var config = {
        // File Path
        app: app,
        alljs: [
            './*.js',
            src + '*.js',
            app + '*.js',
            app + '**/*.js',
            asset + '**/js/*.js',
        ],
        build: build,
        css: temp + 'styles.css',
        favicon: './favicon.ico',
        fonts: ['./bower_components/fontawesome/fonts/**/*.*', './bower_components/bootstrap-css/fonts/**/*.*'],
        html: [build + 'index.html'],
        htmltemplates: [app + '**/*.html', component + '**/*.html'],
        images: asset + 'img/**/*.*',
        index: src + 'index.html',
        js: [
            app + '**/*.module.js',
            app + '**/*.js',
            asset + '**/js/*.js',
            '!' + app + '**/*.spec.js'
        ],
        lessPath: less,
        less: [
            asset + 'less/styles.less',
        ],
        lesswatcher: [ less + '**/*.less'],
        src: src,
        temp: temp,
        templess: temp + 'styles.less',
        //optimized files
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        // Bower Option
        bower: {
            json: require('./bower.json'),
            directory: './bower_components',
            ingorePath: '../..'
        },
        // Server Setting
        defaultPort: 7203,
        nodeServer: './server.js',
        // Browser sync
        browserReloadDelay: 1000,
        // tempalte cache
        templateCache : {
            file: 'templates.js',
            options: {
                module: 'eleme',
                standAlone: false,
                root: 'app/'
            }
        }
    };
    config.getWiredepDefaultOptions = function getWiredepDefaultOptions() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath,
            exclude: ['js/bootstrap.min.js']
        };
        return options;
    };
    return config;
};
