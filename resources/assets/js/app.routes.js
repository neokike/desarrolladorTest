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
                    templateUrl: 'html/listarTrabajadores.html',
                })
        }]);
