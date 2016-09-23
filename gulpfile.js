const elixir = require('laravel-elixir');

require('laravel-elixir-vue');

const nodeModulesPath = '../../../node_modules/';
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.sass('app.scss')
        .scripts([
            nodeModulesPath + '/angular/angular.min.js',
            nodeModulesPath + '/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            nodeModulesPath + '/angular-ui-router/release/angular-ui-router.min.js',
            nodeModulesPath + '/angular-validation/dist/angular-validation-rule.min.js',
            nodeModulesPath + '/angular-validation/dist/angular-validation.min.js',
        ], 'public/js/vendor.js');
});
