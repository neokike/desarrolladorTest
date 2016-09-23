angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('trabajadores', {
                    url: '/trabajadores',
                    template: '<div ui-view></div>',
                })
                .state('trabajadores.listar', {
                    url: '/listar',
                    controller: 'listarTrabajadoresCtrl as listarVm',
                    templateUrl: 'html/trabajadores/views/listarTrabajadores.html',
                })
                .state('trabajadores.nuevo', {
                    url: '/nuevo',
                    controller: 'crearTrabajadorCtrl as verVm',
                    templateUrl: 'html/trabajadores/views/verTrabajador.html',
                })
                .state('trabajadores.editar', {
                    url: '/editar/{id}',
                    controller: 'editarTrabajadorCtrl as verVm',
                    templateUrl: 'html/trabajadores/views/verTrabajador.html',
                })
                .state('arbol', {
                    url: '/arbol',
                    controller: 'arbolCtrl as arbolVm',
                    templateUrl: 'html/arbol/views/arbol.html',
                })
        }]);
