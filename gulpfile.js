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
        .styles([
            nodeModulesPath + '/angular-datatables/dist/css/angular-datatables.css',
            nodeModulesPath + '/angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.min.css',
            nodeModulesPath + '/angular-toastr/dist/angular-toastr.css',
        ], 'public/css/vendor.css')
        .scripts([
            nodeModulesPath + '/jquery/dist/jquery.js',
            nodeModulesPath + '/datatables.net/js/jquery.dataTables.js',
            nodeModulesPath + '/angular/angular.js',
            nodeModulesPath + '/bootstrap-sass/assets/javascripts/bootstrap.js',
            nodeModulesPath + '/angular-ui-router/release/angular-ui-router.js',
            nodeModulesPath + '/angular-validation/dist/angular-validation-rule.js',
            nodeModulesPath + '/angular-validation/dist/angular-validation.js',
            nodeModulesPath + '/angular-datatables/dist/angular-datatables.js',
            nodeModulesPath + '/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js',
            nodeModulesPath + '/angular-toastr/dist/angular-toastr.tpls.js',
        ], 'public/js/vendor.js')
        .scripts([
            'app.js',
            'app.config.js',
            'app.routes.js',
            'common/services/apiService.js',
            'modulos/trabajadores/controllers/crearTrabajadoresCtrl.js',
            'modulos/trabajadores/controllers/listarTrabajadoresCtrl.js',
            'modulos/trabajadores/controllers/editarTrabajadoresCtrl.js',
        ], 'public/js/app.js')
        .copy('resources/assets/js/modulos/trabajadores/views', 'public/html');


});
